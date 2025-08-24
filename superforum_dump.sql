--
-- PostgreSQL database dump
--

-- Dumped from database version 14.19 (Ubuntu 14.19-1.pgdg22.04+1)
-- Dumped by pg_dump version 14.18 (Ubuntu 14.18-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ThreadCategories; Type: TABLE; Schema: public; Owner: superforumsvc
--

CREATE TABLE public."ThreadCategories" (
    "CreatedBy" character varying(60) DEFAULT getpgusername() NOT NULL,
    "createdOn" timestamp without time zone DEFAULT now() NOT NULL,
    "LastModifiedBy" character varying(60) DEFAULT getpgusername() NOT NULL,
    "LastModifiedOn" timestamp without time zone DEFAULT now() NOT NULL,
    "Id" bigint NOT NULL,
    "Name" character varying(100) NOT NULL,
    "Description" character varying(150)
);


ALTER TABLE public."ThreadCategories" OWNER TO superforumsvc;

--
-- Name: ThreadCategories_Id_seq; Type: SEQUENCE; Schema: public; Owner: superforumsvc
--

CREATE SEQUENCE public."ThreadCategories_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ThreadCategories_Id_seq" OWNER TO superforumsvc;

--
-- Name: ThreadCategories_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: superforumsvc
--

ALTER SEQUENCE public."ThreadCategories_Id_seq" OWNED BY public."ThreadCategories"."Id";


--
-- Name: ThreadItemPoints; Type: TABLE; Schema: public; Owner: superforumsvc
--

CREATE TABLE public."ThreadItemPoints" (
    "CreatedBy" character varying(60) DEFAULT getpgusername() NOT NULL,
    "createdOn" timestamp without time zone DEFAULT now() NOT NULL,
    "LastModifiedBy" character varying(60) DEFAULT getpgusername() NOT NULL,
    "LastModifiedOn" timestamp without time zone DEFAULT now() NOT NULL,
    "Id" bigint NOT NULL,
    "IsDecrement" boolean DEFAULT false NOT NULL,
    "userId" bigint,
    "threadItemId" bigint
);


ALTER TABLE public."ThreadItemPoints" OWNER TO superforumsvc;

--
-- Name: ThreadItemPoints_Id_seq; Type: SEQUENCE; Schema: public; Owner: superforumsvc
--

CREATE SEQUENCE public."ThreadItemPoints_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ThreadItemPoints_Id_seq" OWNER TO superforumsvc;

--
-- Name: ThreadItemPoints_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: superforumsvc
--

ALTER SEQUENCE public."ThreadItemPoints_Id_seq" OWNED BY public."ThreadItemPoints"."Id";


--
-- Name: ThreadItems; Type: TABLE; Schema: public; Owner: superforumsvc
--

CREATE TABLE public."ThreadItems" (
    "CreatedBy" character varying(60) DEFAULT getpgusername() NOT NULL,
    "createdOn" timestamp without time zone DEFAULT now() NOT NULL,
    "LastModifiedBy" character varying(60) DEFAULT getpgusername() NOT NULL,
    "LastModifiedOn" timestamp without time zone DEFAULT now() NOT NULL,
    "Id" bigint NOT NULL,
    "Views" integer DEFAULT 0 NOT NULL,
    "Points" integer DEFAULT 0 NOT NULL,
    "IsDisabled" boolean DEFAULT false NOT NULL,
    "Body" character varying(2500),
    "userId" bigint,
    "threadId" bigint
);


ALTER TABLE public."ThreadItems" OWNER TO superforumsvc;

--
-- Name: ThreadItems_Id_seq; Type: SEQUENCE; Schema: public; Owner: superforumsvc
--

CREATE SEQUENCE public."ThreadItems_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ThreadItems_Id_seq" OWNER TO superforumsvc;

--
-- Name: ThreadItems_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: superforumsvc
--

ALTER SEQUENCE public."ThreadItems_Id_seq" OWNED BY public."ThreadItems"."Id";


--
-- Name: ThreadPoints; Type: TABLE; Schema: public; Owner: superforumsvc
--

CREATE TABLE public."ThreadPoints" (
    "CreatedBy" character varying(60) DEFAULT getpgusername() NOT NULL,
    "createdOn" timestamp without time zone DEFAULT now() NOT NULL,
    "LastModifiedBy" character varying(60) DEFAULT getpgusername() NOT NULL,
    "LastModifiedOn" timestamp without time zone DEFAULT now() NOT NULL,
    "Id" bigint NOT NULL,
    "IsDecrement" boolean DEFAULT false NOT NULL,
    "userId" bigint,
    "threadId" bigint
);


ALTER TABLE public."ThreadPoints" OWNER TO superforumsvc;

--
-- Name: ThreadPoints_Id_seq; Type: SEQUENCE; Schema: public; Owner: superforumsvc
--

CREATE SEQUENCE public."ThreadPoints_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ThreadPoints_Id_seq" OWNER TO superforumsvc;

--
-- Name: ThreadPoints_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: superforumsvc
--

ALTER SEQUENCE public."ThreadPoints_Id_seq" OWNED BY public."ThreadPoints"."Id";


--
-- Name: Threads; Type: TABLE; Schema: public; Owner: superforumsvc
--

CREATE TABLE public."Threads" (
    "CreatedBy" character varying(60) DEFAULT getpgusername() NOT NULL,
    "createdOn" timestamp without time zone DEFAULT now() NOT NULL,
    "LastModifiedBy" character varying(60) DEFAULT getpgusername() NOT NULL,
    "LastModifiedOn" timestamp without time zone DEFAULT now() NOT NULL,
    "Id" bigint NOT NULL,
    "userId" bigint,
    "Views" integer DEFAULT 0 NOT NULL,
    "IsDisabled" boolean DEFAULT false NOT NULL,
    "Points" integer DEFAULT 0 NOT NULL,
    "Title" character varying(150) NOT NULL,
    "Body" character varying(2500),
    "categoryId" bigint
);


ALTER TABLE public."Threads" OWNER TO superforumsvc;

--
-- Name: Threads_Id_seq; Type: SEQUENCE; Schema: public; Owner: superforumsvc
--

CREATE SEQUENCE public."Threads_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Threads_Id_seq" OWNER TO superforumsvc;

--
-- Name: Threads_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: superforumsvc
--

ALTER SEQUENCE public."Threads_Id_seq" OWNED BY public."Threads"."Id";


--
-- Name: Users; Type: TABLE; Schema: public; Owner: superforumsvc
--

CREATE TABLE public."Users" (
    "CreatedBy" character varying(60) DEFAULT getpgusername() NOT NULL,
    "createdOn" timestamp without time zone DEFAULT now() NOT NULL,
    "LastModifiedBy" character varying(60) DEFAULT getpgusername() NOT NULL,
    "LastModifiedOn" timestamp without time zone DEFAULT now() NOT NULL,
    "Id" bigint NOT NULL,
    "Email" character varying(120) NOT NULL,
    "UserName" character varying(60) NOT NULL,
    "Password" character varying(100) NOT NULL,
    "Confirmed" boolean DEFAULT true NOT NULL,
    "isDisabled" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Users" OWNER TO superforumsvc;

--
-- Name: Users_Id_seq; Type: SEQUENCE; Schema: public; Owner: superforumsvc
--

CREATE SEQUENCE public."Users_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_Id_seq" OWNER TO superforumsvc;

--
-- Name: Users_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: superforumsvc
--

ALTER SEQUENCE public."Users_Id_seq" OWNED BY public."Users"."Id";


--
-- Name: ThreadCategories Id; Type: DEFAULT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."ThreadCategories" ALTER COLUMN "Id" SET DEFAULT nextval('public."ThreadCategories_Id_seq"'::regclass);


--
-- Name: ThreadItemPoints Id; Type: DEFAULT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."ThreadItemPoints" ALTER COLUMN "Id" SET DEFAULT nextval('public."ThreadItemPoints_Id_seq"'::regclass);


--
-- Name: ThreadItems Id; Type: DEFAULT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."ThreadItems" ALTER COLUMN "Id" SET DEFAULT nextval('public."ThreadItems_Id_seq"'::regclass);


--
-- Name: ThreadPoints Id; Type: DEFAULT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."ThreadPoints" ALTER COLUMN "Id" SET DEFAULT nextval('public."ThreadPoints_Id_seq"'::regclass);


--
-- Name: Threads Id; Type: DEFAULT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."Threads" ALTER COLUMN "Id" SET DEFAULT nextval('public."Threads_Id_seq"'::regclass);


--
-- Name: Users Id; Type: DEFAULT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."Users" ALTER COLUMN "Id" SET DEFAULT nextval('public."Users_Id_seq"'::regclass);


--
-- Data for Name: ThreadCategories; Type: TABLE DATA; Schema: public; Owner: superforumsvc
--

COPY public."ThreadCategories" ("CreatedBy", "createdOn", "LastModifiedBy", "LastModifiedOn", "Id", "Name", "Description") FROM stdin;
anthai	2025-06-17 21:17:04.851507	anthai	2025-06-17 21:17:04.851507	1	Programming	
anthai	2025-06-17 21:17:04.851507	anthai	2025-06-17 21:17:04.851507	2	Cooking	
anthai	2025-06-17 21:17:04.851507	anthai	2025-06-17 21:17:04.851507	3	Gaming	
anthai	2025-06-17 21:17:04.851507	anthai	2025-06-17 21:17:04.851507	4	Finance	
anthai	2025-06-17 21:17:04.851507	anthai	2025-06-17 21:17:04.851507	5	Travel	
\.


--
-- Data for Name: ThreadItemPoints; Type: TABLE DATA; Schema: public; Owner: superforumsvc
--

COPY public."ThreadItemPoints" ("CreatedBy", "createdOn", "LastModifiedBy", "LastModifiedOn", "Id", "IsDecrement", "userId", "threadItemId") FROM stdin;
\.


--
-- Data for Name: ThreadItems; Type: TABLE DATA; Schema: public; Owner: superforumsvc
--

COPY public."ThreadItems" ("CreatedBy", "createdOn", "LastModifiedBy", "LastModifiedOn", "Id", "Views", "Points", "IsDisabled", "Body", "userId", "threadId") FROM stdin;
superforumsvc	2025-08-09 19:35:40.835663	superforumsvc	2025-08-09 19:35:40.835663	1	0	0	f	Testing of response	12	5
superforumsvc	2025-08-09 19:51:42.949095	superforumsvc	2025-08-09 19:51:42.949095	2	0	0	f	[{"type":"paragraph","children":[{"text":"testing 2"}]}]	12	5
superforumsvc	2025-08-09 19:53:15.603132	superforumsvc	2025-08-09 19:53:15.603132	3	0	0	f	[{"type":"paragraph","children":[{"text":"testing 2","bold":true,"italic":true}]}]	12	5
superforumsvc	2025-08-09 20:15:09.829322	superforumsvc	2025-08-09 20:15:09.829322	4	0	0	f	[{"type":"paragraph","children":[{"text":"avcx","underline":true,"code":true}]}]	12	5
\.


--
-- Data for Name: ThreadPoints; Type: TABLE DATA; Schema: public; Owner: superforumsvc
--

COPY public."ThreadPoints" ("CreatedBy", "createdOn", "LastModifiedBy", "LastModifiedOn", "Id", "IsDecrement", "userId", "threadId") FROM stdin;
superforumsvc	2025-07-27 18:41:20.663694	superforumsvc	2025-07-27 18:41:20.663694	94	f	12	1
superforumsvc	2025-08-09 19:54:58.27235	superforumsvc	2025-08-09 19:54:58.27235	97	t	12	2
\.


--
-- Data for Name: Threads; Type: TABLE DATA; Schema: public; Owner: superforumsvc
--

COPY public."Threads" ("CreatedBy", "createdOn", "LastModifiedBy", "LastModifiedOn", "Id", "userId", "Views", "IsDisabled", "Points", "Title", "Body", "categoryId") FROM stdin;
superforumsvc	2025-06-22 21:56:19.578495	superforumsvc	2025-07-27 18:41:20.664	1	1	0	f	1	Testing title of not logged in	Testing body for threads	3
superforumsvc	2025-08-08 21:53:42.233753	superforumsvc	2025-08-08 21:53:42.233753	7	12	0	f	0	safdadsf	[{"type":"paragraph","children":[{"text":"dsafsadfdsfsdasd","bold":true,"italic":true,"underline":true}]}]	5
superforumsvc	2025-06-28 21:41:57.661666	superforumsvc	2025-06-28 21:41:57.661666	4	12	0	f	0	Testing for cat2	Body of cat2	2
superforumsvc	2025-06-28 21:42:21.952618	superforumsvc	2025-06-28 21:42:21.952618	5	12	0	f	0	Testing for cat4	Body of cat4	4
superforumsvc	2025-06-28 21:42:37.547969	superforumsvc	2025-06-28 21:42:37.547969	6	12	0	f	0	Testing for cat5	Body of cat5	5
superforumsvc	2025-06-22 22:22:21.477686	superforumsvc	2025-08-09 19:54:58.275	2	1	0	f	-1	Testing title of not logged in	Testing body for threads	3
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: superforumsvc
--

COPY public."Users" ("CreatedBy", "createdOn", "LastModifiedBy", "LastModifiedOn", "Id", "Email", "UserName", "Password", "Confirmed", "isDisabled") FROM stdin;
superforumsvc	2025-06-17 21:16:09.031808	superforumsvc	2025-06-17 21:16:09.031808	1	test@test.com	tester	$2b$10$HpLIGG5g97g7Aiw/TQaHRuNv12wroScplkaZy6Scytv43DVtCeeQ.	t	f
superforumsvc	2025-06-22 21:55:24.620097	superforumsvc	2025-06-22 21:55:24.620097	5	test@test1.com	tester1	$2b$10$ttPGlK9qRpMgFBek5elCve0AHZPNhY9.23eVRtXkDKDtbZczvYLHG	t	f
superforumsvc	2025-06-22 22:27:23.829627	superforumsvc	2025-06-22 22:27:23.829627	6	test@test2.com	tester2	$2b$10$7rnBA2AbLpuFyGct/X2dNOtZBr.dvn0wMnTJeh7PktjP1T7wJ0Uze	t	f
superforumsvc	2025-06-22 22:42:43.371276	superforumsvc	2025-06-22 22:42:43.371276	7	antb@test.com	antb	$2b$10$9Pu4EY8wKiOZPGucPhToiuEr4GjV148l8lfxYFOD7/HTKGqZQ5KCW	t	f
superforumsvc	2025-06-22 22:55:30.123754	superforumsvc	2025-06-22 22:55:30.123754	10	antb1@test.com	antb1	$2b$10$YaIj0zAgajf5JWBscjctleYLrgl/dz66TDKx1rty.NE3YioUow8qq	t	t
superforumsvc	2025-06-23 22:28:16.698987	superforumsvc	2025-06-23 22:28:16.698987	12	antb3@mail.com	antb3	$2b$10$mWZHlmcvrsBL.W/YEq1DbeaFlVH.LllUb4HfJspvZlGLH2dqLUFhi	t	t
superforumsvc	2025-07-20 17:07:54.345128	superforumsvc	2025-07-20 17:07:54.345128	13	antb4@gmail.com	antb4	$2b$10$C74vhpxc4IO1Rajk/FSad.Ltxa37gumFi..FzutQvFEWI8uMjfGa6	t	t
superforumsvc	2025-07-21 22:33:21.166437	superforumsvc	2025-07-21 22:33:21.166437	14	antb5@mail.com	antb5	$2b$10$jX4Vx1CS8bH4wPdDLSUiKOW4pMlR6mXYu2E1j.kbtcIihJtZWZqIy	t	t
\.


--
-- Name: ThreadCategories_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: superforumsvc
--

SELECT pg_catalog.setval('public."ThreadCategories_Id_seq"', 5, true);


--
-- Name: ThreadItemPoints_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: superforumsvc
--

SELECT pg_catalog.setval('public."ThreadItemPoints_Id_seq"', 1, false);


--
-- Name: ThreadItems_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: superforumsvc
--

SELECT pg_catalog.setval('public."ThreadItems_Id_seq"', 4, true);


--
-- Name: ThreadPoints_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: superforumsvc
--

SELECT pg_catalog.setval('public."ThreadPoints_Id_seq"', 97, true);


--
-- Name: Threads_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: superforumsvc
--

SELECT pg_catalog.setval('public."Threads_Id_seq"', 7, true);


--
-- Name: Users_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: superforumsvc
--

SELECT pg_catalog.setval('public."Users_Id_seq"', 14, true);


--
-- Name: Threads PK_178ba4a3910955fec4cab971efd; Type: CONSTRAINT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."Threads"
    ADD CONSTRAINT "PK_178ba4a3910955fec4cab971efd" PRIMARY KEY ("Id");


--
-- Name: Users PK_329bb2946729a51bd2b19a5159f; Type: CONSTRAINT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "PK_329bb2946729a51bd2b19a5159f" PRIMARY KEY ("Id");


--
-- Name: ThreadPoints PK_8eea743854dd7759cc8f4edb8bf; Type: CONSTRAINT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."ThreadPoints"
    ADD CONSTRAINT "PK_8eea743854dd7759cc8f4edb8bf" PRIMARY KEY ("Id");


--
-- Name: ThreadItems PK_947a2066de93d888b994cb19f8f; Type: CONSTRAINT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."ThreadItems"
    ADD CONSTRAINT "PK_947a2066de93d888b994cb19f8f" PRIMARY KEY ("Id");


--
-- Name: ThreadItemPoints PK_b1aa195491a675bf74ec5f9c832; Type: CONSTRAINT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."ThreadItemPoints"
    ADD CONSTRAINT "PK_b1aa195491a675bf74ec5f9c832" PRIMARY KEY ("Id");


--
-- Name: ThreadCategories PK_b5be81a3d2daca19f07af9a8e39; Type: CONSTRAINT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."ThreadCategories"
    ADD CONSTRAINT "PK_b5be81a3d2daca19f07af9a8e39" PRIMARY KEY ("Id");


--
-- Name: Users UQ_81ddd1336f4d0833a46c289c4c5; Type: CONSTRAINT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "UQ_81ddd1336f4d0833a46c289c4c5" UNIQUE ("UserName");


--
-- Name: Users UQ_884fdf47515c24dbbf6d89c2d84; Type: CONSTRAINT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "UQ_884fdf47515c24dbbf6d89c2d84" UNIQUE ("Email");


--
-- Name: ThreadCategories UQ_d9dddd39ac20dc26ab4b42c5996; Type: CONSTRAINT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."ThreadCategories"
    ADD CONSTRAINT "UQ_d9dddd39ac20dc26ab4b42c5996" UNIQUE ("Name");


--
-- Name: ThreadItemPoints FK_07a2fe29ccf5bc41a9e641d634e; Type: FK CONSTRAINT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."ThreadItemPoints"
    ADD CONSTRAINT "FK_07a2fe29ccf5bc41a9e641d634e" FOREIGN KEY ("userId") REFERENCES public."Users"("Id");


--
-- Name: Threads FK_2335671d96d9904c3c64aaa9227; Type: FK CONSTRAINT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."Threads"
    ADD CONSTRAINT "FK_2335671d96d9904c3c64aaa9227" FOREIGN KEY ("categoryId") REFERENCES public."ThreadCategories"("Id");


--
-- Name: ThreadPoints FK_51ced2c81a7193840de86db1156; Type: FK CONSTRAINT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."ThreadPoints"
    ADD CONSTRAINT "FK_51ced2c81a7193840de86db1156" FOREIGN KEY ("threadId") REFERENCES public."Threads"("Id");


--
-- Name: ThreadPoints FK_57a6865691c81b197b610f0665d; Type: FK CONSTRAINT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."ThreadPoints"
    ADD CONSTRAINT "FK_57a6865691c81b197b610f0665d" FOREIGN KEY ("userId") REFERENCES public."Users"("Id");


--
-- Name: ThreadItemPoints FK_747b9723d2e54dd1206d118c9d6; Type: FK CONSTRAINT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."ThreadItemPoints"
    ADD CONSTRAINT "FK_747b9723d2e54dd1206d118c9d6" FOREIGN KEY ("threadItemId") REFERENCES public."ThreadItems"("Id");


--
-- Name: ThreadItems FK_96f5d01d221a9f1c91cb280e17e; Type: FK CONSTRAINT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."ThreadItems"
    ADD CONSTRAINT "FK_96f5d01d221a9f1c91cb280e17e" FOREIGN KEY ("userId") REFERENCES public."Users"("Id");


--
-- Name: ThreadItems FK_a7e38f782da74157898bcc6ed8d; Type: FK CONSTRAINT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."ThreadItems"
    ADD CONSTRAINT "FK_a7e38f782da74157898bcc6ed8d" FOREIGN KEY ("threadId") REFERENCES public."Threads"("Id");


--
-- Name: Threads FK_cb3b9ea3227027bda13e0ab9fb2; Type: FK CONSTRAINT; Schema: public; Owner: superforumsvc
--

ALTER TABLE ONLY public."Threads"
    ADD CONSTRAINT "FK_cb3b9ea3227027bda13e0ab9fb2" FOREIGN KEY ("userId") REFERENCES public."Users"("Id");


--
-- PostgreSQL database dump complete
--

