import { relations } from "drizzle-orm";
import { pgTable, bigint, text, timestamp, boolean, index } from "drizzle-orm/pg-core";


export const comments_table = pgTable(
  "comments",
  {
    id: bigint("id", { mode: "number"})
      .primaryKey()
      .generatedAlwaysAsIdentity(),
      // id del usuario
    ownerId: text("owner_id").notNull()
    .references(() => user.id, { onDelete: "cascade" }),
    title: text("name").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [index("comments_userId_idx").on(table.ownerId),
    index("comments_title_idx").on(table.title),

  ],
);

export const proyects = pgTable(
  "proyectos",
  {
  id: bigint("id", { mode: "number"})
      .primaryKey()
      .generatedAlwaysAsIdentity(),
      // id del usuario
  name: text("name").notNull(),
  description: text("description").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  municipalidad: text("municipality").notNull(),
  budget: bigint("budget", { mode: "number"}).notNull(),
  startedAt: timestamp("started_at").notNull().defaultNow(),

  },
    (t) => {
    return [
      index("name_index").on(t.name),
      index("company_index").on(t.company),
      index("location_index").on(t.location),
      index("municipalidad_index").on(t.municipalidad),
    ];
  },
)


export const proyect_changes = pgTable(
  "proyectos_changes",
  {
  id: bigint("id", { mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
  proyectId: bigint("proyect_id", { mode: "number"}).notNull()
  .references(() => proyects.id, { onDelete: "cascade" }),
  changeTitle: text("change_title").notNull(),

  userId: text("user_id").notNull()
  .references(() => user.id, { onDelete: "cascade" }),
  details: text("details").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  budgetSpent: bigint("budget_spent", { mode: "number"}).notNull(),

  },
    (t) => {
    return [
      index("proyecto_index").on(t.proyectId),
      index("user_index").on(t.userId),
    ];
  },
)


// better auth tables
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text("role"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const commentsRelations = relations(comments_table, ({ one }) => ({
  user: one(user, {
    fields: [comments_table.ownerId],
    references: [user.id],
  }),
}));

export const proyectChangesRelations = relations(proyect_changes, ({ one }) => ({
  user: one(user, {
    fields: [proyect_changes.userId],
    references: [user.id],
  }),
  proyect: one(proyects, {
    fields: [proyect_changes.proyectId],
    references: [proyects.id],
  }),
}))





