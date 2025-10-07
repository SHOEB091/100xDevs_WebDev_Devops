## Zod Validation Deep Dive (Revision Notes)

Zod is a TypeScript-first runtime validation and parsing library. You define *schemas* that both:
1. Validate unknown data at runtime (e.g. user input, API body, env vars).
2. Infer static TypeScript types automatically from those schemas.

> Core idea: A schema describes the *shape* (and constraints) of data. `schema.parse(data)` returns typed, safe data or throws with structured errors. `schema.safeParse(data)` returns `{ success: true; data } | { success: false; error }`.

---
### 1. Installation

```bash
npm install zod
# or
yarn add zod
```

---
### 2. Basic Schemas

```ts
import { z } from 'zod';

const UserName = z.string().min(3).max(30);
const Age = z.number().int().gte(0).lte(120);

const UserSchema = z.object({
	username: UserName,
	age: Age.optional(),   // optional field
	isAdmin: z.boolean().default(false),
});

type User = z.infer<typeof UserSchema>; // TypeScript type

const parsed = UserSchema.parse({ username: 'shoeb', age: 21 });
// parsed is typed as User
```

**Optional vs Nullable**:
```ts
z.string().optional(); // undefined allowed
z.string().nullable(); // null allowed
z.string().optional().nullable(); // string | null | undefined
```

---
### 3. Safe Parsing & Error Handling

```ts
const result = UserSchema.safeParse(dataFromRequest);
if (!result.success) {
	console.log(result.error.flatten());
	// result.error.issues -> array with detailed path + message
} else {
	// result.data is validated
}
```

`flatten()` returns:
```ts
{
	formErrors: string[]; // general errors
	fieldErrors: { [k: string]: string[] | undefined }
}
```

Custom error messages:
```ts
z.string().min(3, { message: 'At least 3 chars required' });
```

---
### 4. Refinements & SuperRefine

Use `.refine` for simple boolean checks, `.superRefine` for multi-field logic.

```ts
const PasswordSchema = z.string().min(8).regex(/[0-9]/, 'Must contain a number');

const RegistrationSchema = z.object({
	email: z.string().email(),
	password: PasswordSchema,
	confirmPassword: z.string(),
}).superRefine((val, ctx) => {
	if (val.password !== val.confirmPassword) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Passwords do not match',
			path: ['confirmPassword']
		});
	}
});
```

---
### 5. Transformations

`transform` lets you map validated input to a new value.

```ts
const TrimmedString = z.string().transform(s => s.trim());
const NumberFromString = z.string().regex(/^\d+$/).transform(s => Number(s));

const ProductSchema = z.object({
	title: TrimmedString.min(1),
	price: NumberFromString.refine(n => n >= 0, 'Price must be >= 0')
});
```

Chain transforms carefully—each transform changes the *output type*.

Preprocess (runs before validation):
```ts
const ToNumber = z.preprocess(val => {
	if (typeof val === 'string' && val !== '') return Number(val);
	return val;
}, z.number());
```

---
### 6. Arrays, Records, Enums, Tuples

```ts
const Tags = z.array(z.string().min(1)).max(5);
const StringRecord = z.record(z.string());
const Role = z.enum(['USER', 'ADMIN']);
const Point = z.tuple([z.number(), z.number()]);
```

---
### 7. Unions & Discriminated Unions

Useful for branching shapes.

```ts
const Cat = z.object({ type: z.literal('cat'), meows: z.boolean() });
const Dog = z.object({ type: z.literal('dog'), barks: z.boolean() });

const Pet = z.discriminatedUnion('type', [Cat, Dog]);
type Pet = z.infer<typeof Pet>;
```

Regular union:
```ts
const SearchParam = z.union([z.string(), z.number()]);
```

---
### 8. Composition Utilities

```ts
const Base = z.object({ id: z.string().uuid(), createdAt: z.date() });
const UserCore = z.object({ username: z.string(), email: z.string().email() });

const FullUser = Base.merge(UserCore).extend({ isAdmin: z.boolean().default(false) });

// Pick/Omit/Partial/Required
const PublicUser = FullUser.pick({ id: true, username: true });
const UpdateUser = UserCore.partial(); // all optional
```

Deep partial:
```ts
const Deep = z.object({ a: z.object({ b: z.string() }) });
const DeepPartial = Deep.deepPartial(); // all nested fields optional
```

---
### 9. Dates & Coercion

```ts
const DateSchema = z.coerce.date(); // accepts string | number -> Date
```

Number/string coercion:
```ts
const CoercedNumber = z.coerce.number();
```

---
### 10. Async Validations

Use `.refine(async val => ...)` or `.superRefine` returning a Promise. Then call `parseAsync` / `safeParseAsync`.

```ts
const UniqueUsername = z.string().min(3).refine(async username => {
	const exists = await db.userExists(username);
	return !exists;
}, 'Username already taken');

await UniqueUsername.parseAsync('shoeb');
```

---
### 11. Express Middleware Pattern

```ts
// validator.ts
import { z } from 'zod';
export const validate = (schema: z.ZodTypeAny, source: 'body' | 'query' | 'params' = 'body') => 
	(req, res, next) => {
		const result = schema.safeParse(req[source]);
		if (!result.success) {
			return res.status(400).json({ errors: result.error.flatten() });
		}
		req.validated = { ...(req.validated || {}), [source]: result.data };
		next();
	};

// usage in route
const CreateTodoSchema = z.object({ text: z.string().min(1).max(200) });
app.post('/api/todos', authMiddleware, validate(CreateTodoSchema), (req, res) => {
	const { text } = req.validated.body; // safe
	// create todo...
});
```

Add a TypeScript augmentation for `req.validated` if using TS.

---
### 12. Query & Params Validation

```ts
const ListQuery = z.object({ page: z.coerce.number().min(1).default(1), limit: z.coerce.number().min(1).max(100).default(10) });
const IdParam = z.object({ id: z.string().length(24) }); // e.g. Mongo ObjectId length check
```

---
### 13. Environment Variables Validation

```ts
const EnvSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	MONGODB_URI: z.string().url(),
	JWT_SECRET: z.string().min(16),
	PORT: z.coerce.number().min(1).max(65535).default(3000)
});

const env = EnvSchema.parse(process.env);
```

---
### 14. Error Formatting / Custom Messages

You can customize globally with `z.setErrorMap`:
```ts
import { z } from 'zod';
z.setErrorMap((issue, ctx) => {
	if (issue.code === z.ZodIssueCode.invalid_type) {
		return { message: `Expected ${issue.expected}, received ${issue.received}` };
	}
	return { message: ctx.defaultError };
});
```

---
### 15. Guarding Transform + Validation Order

Remember: `.transform` changes output; subsequent refinements operate on transformed value *if placed after transform*.

```ts
const Schema = z.string().transform(s => s.trim()).refine(s => s.length > 0, 'Cannot be empty');
```

---
### 16. Reusable Patterns

| Pattern | Zod | Example |
|--------|-----|---------|
| Email | `z.string().email()` | `email: z.string().email()` |
| Password Complexity | `z.string().min(8).regex(/[0-9]/)` | `password: PasswordSchema` |
| Positive Int | `z.number().int().positive()` | `count: z.number().int().positive()` |
| Mongo ObjectId (basic) | `z.string().length(24)` | `id: z.string().length(24)` |

---
### 17. Performance Tips

* Reuse schemas instead of recreating inside handlers.
* Prefer `.parse` only when you want thrown exceptions; else use `.safeParse` for control flow.
* Avoid overly deep nested transforms in hot paths.

---
### 18. Migrating Existing Validation to Zod (Example: Todo Creation)

Previous manual code:
```ts
if (!req.body.text || typeof req.body.text !== 'string' || req.body.text.length === 0) {
	return res.status(400).json({ message: 'Invalid text' });
}
```

With Zod:
```ts
const CreateTodo = z.object({ text: z.string().trim().min(1).max(200) });
const parsed = CreateTodo.parse(req.body); // throws if invalid
// parsed.text is a trimmed non-empty string
```

---
### 19. Partial Updates (e.g. PATCH /api/todos/:id)

```ts
const UpdateTodo = z.object({
	text: z.string().trim().min(1).max(200).optional(),
	completed: z.boolean().optional()
}).refine(data => Object.keys(data).length > 0, { message: 'At least one field required' });
```

---
### 20. Advanced: Discriminated Update Example

```ts
const ToggleSchema = z.discriminatedUnion('action', [
	z.object({ action: z.literal('complete'), completedAt: z.coerce.date() }),
	z.object({ action: z.literal('reopen') })
]);
```

---
### 21. Type Inference Recap

```ts
const Schema = z.object({ a: z.string(), b: z.number().optional() });
type SchemaType = z.infer<typeof Schema>; // { a: string; b?: number | undefined }
```

---
### 22. Common Mistakes

| Mistake | Fix |
|---------|-----|
| Using `Content-Type: application` instead of `application/json` | Set correct header |
| Forgetting `express.json()` middleware | Add before routes |
| Expecting transformed output inside `refine` declared *before* `transform` | Move refine after transform |
| Using `.parse` in production without try/catch | Use `.safeParse` or wrap in try |

---
### 23. Putting It All Together (Express Example)

```ts
// schemas.ts
import { z } from 'zod';
export const AuthRegister = z.object({
	username: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(8)
});

export const AuthLogin = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});

export const TodoCreate = z.object({ text: z.string().trim().min(1).max(200) });

// middleware/validate.ts
import { z } from 'zod';
export const withSchema = (schema: z.ZodTypeAny) => (req, res, next) => {
	const result = schema.safeParse(req.body);
	if (!result.success) return res.status(400).json({ errors: result.error.flatten() });
	req.body = result.data; // sanitized
	next();
};

// routes snippet
app.post('/register', withSchema(AuthRegister), (req, res) => { /* create user */ });
app.post('/signin', withSchema(AuthLogin), (req, res) => { /* authenticate */ });
app.post('/api/todos', authMiddleware, withSchema(TodoCreate), (req, res) => { /* add todo */ });
```

---
### 24. When to Use Other Tools Alongside Zod

| Need | Recommendation |
|------|----------------|
| Form state + validation in React | Use Zod + React Hook Form resolver |
| Complex cross-field async logic | Use `.superRefine` with async + parseAsync |
| Schema sharing backend ↔ frontend | Export shared `schemas/` folder |
| API docs (OpenAPI) | Combine Zod with `zod-to-openapi` |

---
### 25. Quick Mental Checklist

1. Define schema near domain logic (or in shared folder).
2. Use `safeParse` for graceful error handling.
3. Reuse constant schemas (don’t recreate per request).
4. Validate *all* external input: body, query, params, headers, env.
5. Narrow early—work with validated types only.

---
### 26. Practice Exercise (Try Yourself)

Create a PATCH `/api/todos/:id` endpoint that:
1. Validates `id` param (24 char hex).
2. Accepts body with optional `text`, `completed`.
3. Rejects empty body.
4. Returns updated todo.

Schemas to build: `TodoIdParam`, `TodoPatchBody` using techniques above.

---
### 27. Useful Links

* Docs: https://zod.dev
* Error codes: https://github.com/colinhacks/zod#zodissuecode
* OpenAPI integration: https://github.com/asteasolutions/zod-to-openapi

---
**End of Zod Deep Dive – Review these sections regularly to internalize patterns.**

---
## Using Zod In Your Node.js / Express App (Practical Integration)

Below is a focused, copy‑paste friendly guide to plug Zod into the authentication + todo API you built.

### 1. Install
```bash
npm install zod
```

### 2. Project Structure (suggested)
```
week7Mongodb/
	routes/
		auth.js
		todos.js
	schemas/
		auth.schema.js
		todo.schema.js
		common.js
	middleware/
		validate.js
```

### 3. Define Schemas (`schemas/auth.schema.js`)
```js
const { z } = require('zod');

const passwordRules = z.string().min(8, 'Min 8 chars').regex(/[0-9]/, 'Need a number');

exports.RegisterSchema = z.object({
	username: z.string().min(3).max(30),
	email: z.string().email(),
	password: passwordRules
});

exports.LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1)
});
```

### 4. Todo Schemas (`schemas/todo.schema.js`)
```js
const { z } = require('zod');

exports.CreateTodoSchema = z.object({
	text: z.string().trim().min(1, 'Text required').max(200)
});

exports.UpdateTodoSchema = z.object({
	text: z.string().trim().min(1).max(200).optional(),
	completed: z.boolean().optional()
}).refine(obj => Object.keys(obj).length > 0, { message: 'At least one field required' });

exports.IdParamSchema = z.object({ id: z.string().length(24, 'Invalid id length') }); // simple ObjectId length check
```

### 5. Validation Middleware (`middleware/validate.js`)
```js
// Generic validator for body, query, params
const { z } = require('zod');

function validate(schema, source = 'body') {
	return (req, res, next) => {
		const result = schema.safeParse(req[source]);
		if (!result.success) {
			return res.status(400).json({
				errors: result.error.flatten(),
				message: 'Validation failed'
			});
		}
		// store sanitized data
		if (!req.validated) req.validated = {};
		req.validated[source] = result.data;
		next();
	};
}

module.exports = { validate };
```

### 6. Use in Auth Routes (`routes/auth.js`)
```js
const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validate');
const { RegisterSchema, LoginSchema } = require('../schemas/auth.schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

router.post('/register', validate(RegisterSchema), async (req, res) => {
	const { username, email, password } = req.validated.body;
	const existing = await User.findOne({ $or: [{ email }, { username }] });
	if (existing) return res.status(400).json({ message: 'User already exists' });
	const hashed = await bcrypt.hash(password, 10);
	const user = await User.create({ username, email, password: hashed });
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
	res.status(201).json({ message: 'User created', token });
});

router.post('/signin', validate(LoginSchema), async (req, res) => {
	const { email, password } = req.validated.body;
	const user = await User.findOne({ email });
	if (!user) return res.status(400).json({ message: 'Invalid credentials' });
	const ok = await bcrypt.compare(password, user.password);
	if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
	res.json({ message: 'Signin successful', token });
});

module.exports = router;
```

### 7. Use in Todo Routes (`routes/todos.js`)
```js
const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validate');
const { CreateTodoSchema, UpdateTodoSchema, IdParamSchema } = require('../schemas/todo.schema');
const Todo = require('../models/todo');
const jwt = require('jsonwebtoken');

// Auth middleware (can keep your existing one)
function auth(req, res, next) {
	const header = req.headers.authorization;
	if (!header) return res.status(401).json({ message: 'No token' });
	const token = header.split(' ')[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.id;
		next();
	} catch (e) { return res.status(401).json({ message: 'Invalid token' }); }
}

router.post('/', auth, validate(CreateTodoSchema), async (req, res) => {
	const { text } = req.validated.body;
	const todo = await Todo.create({ userId: req.userId, text });
	res.status(201).json(todo);
});

router.get('/', auth, async (req, res) => {
	const todos = await Todo.find({ userId: req.userId });
	res.json(todos);
});

router.patch('/:id', auth, validate(IdParamSchema, 'params'), validate(UpdateTodoSchema), async (req, res) => {
	const { id } = req.validated.params;
	const update = req.validated.body;
	const todo = await Todo.findOneAndUpdate({ _id: id, userId: req.userId }, update, { new: true });
	if (!todo) return res.status(404).json({ message: 'Not found' });
	res.json(todo);
});

router.delete('/:id', auth, validate(IdParamSchema, 'params'), async (req, res) => {
	const { id } = req.validated.params;
	const deleted = await Todo.findOneAndDelete({ _id: id, userId: req.userId });
	if (!deleted) return res.status(404).json({ message: 'Not found' });
	res.json({ message: 'Deleted' });
});

module.exports = router;
```

### 8. Wire Routes in `index.js`
```js
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
app.use(express.json());
app.use('/api', authRoutes);        // /api/register, /api/signin
app.use('/api/todos', todoRoutes);  // /api/todos
```

### 9. Handling Validation Errors Uniformly
You can wrap `validate` to always send the same structure. Already done above using `flatten()`. Frontend can display `errors.fieldErrors.text?.[0]` etc.

### 10. Async Database Checks (Unique Email Example)
```js
const { z } = require('zod');
const User = require('../models/users');

const RegisterSchemaAsync = z.object({
	username: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(8)
}).superRefine(async (val, ctx) => {
	const exists = await User.findOne({ email: val.email });
	if (exists) {
		ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['email'], message: 'Email already registered' });
	}
});

// Use parseAsync / safeParseAsync
```

### 11. Environment Variable Validation (Boot Step)
```js
const { z } = require('zod');
const Env = z.object({
	MONGODB_URI: z.string().url(),
	JWT_SECRET: z.string().min(16),
	PORT: z.coerce.number().default(3000)
});
const env = Env.parse(process.env); // throws early if misconfigured
module.exports = env;
```

### 12. Common Debug Tips
| Problem | Fix |
|--------|-----|
| `req.body` empty | Ensure `app.use(express.json())` before routes |
| Always 400 | Log `result.error.format()` in validator |
| Transform not applied | Order: define transform before refine referencing transformed value |
| Async refine ignored | Use `parseAsync` / `safeParseAsync` |

### 13. Quick Mental Flow
1. Define schema near domain.
2. Wrap request with `validate(schema)`.
3. Use sanitized `req.validated.body` / `req.validated.params`.
4. Rely on inferred TS types (if using TS) — no manual type guards needed.

---
**That’s the practical Node.js integration. Start by adding the `schemas/` + `middleware/validate.js`, then convert one route at a time.**

