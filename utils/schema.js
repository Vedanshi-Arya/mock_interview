// import { varchar } from "drizzle-orm/mysql-core";
// import { pgTable } from "drizzle-orm/pg-core";
// import { serial ,text} from "drizzle-orm/mysql-core";


// export const MockInterview=pgTable('MockInterview',{
//     id:serial('id').primaryKey(),
//     jsonMockResp:text('jsonMockResp').notNull(),
//     jobPosition:varchar('jobPosition').notNull(),
//     jobDes:varchar('jobDes').notNull(),
//     experience:varchar('experience').notNull(),
//     createdBy:varchar('createdBy').notNull(),
//     createdAt:varchar('createdAt'),
//     mockId:varchar('mockId').notNull()

// })

import { varchar, text, serial } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('MockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition', { length: 255 }).notNull(),
    jobDes: varchar('jobDes', { length: 255 }).notNull(),
    experience: varchar('experience', { length: 255 }).notNull(),
    createdBy: varchar('createdBy', { length: 255 }).notNull(),
    createdAt: varchar('createdAt', { length: 255 }),
    mockId: varchar('mockId', { length: 255 }).notNull()
});
