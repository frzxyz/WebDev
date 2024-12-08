--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Actor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Actor" (
    id integer NOT NULL,
    name text NOT NULL,
    photo text,
    "countryId" integer NOT NULL
);


ALTER TABLE public."Actor" OWNER TO postgres;

--
-- Name: Actor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Actor_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Actor_id_seq" OWNER TO postgres;

--
-- Name: Actor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Actor_id_seq" OWNED BY public."Actor".id;


--
-- Name: Award; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Award" (
    id integer NOT NULL,
    name text NOT NULL,
    year integer NOT NULL,
    "dramaId" integer NOT NULL,
    "countryId" integer NOT NULL
);


ALTER TABLE public."Award" OWNER TO postgres;

--
-- Name: Award_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Award_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Award_id_seq" OWNER TO postgres;

--
-- Name: Award_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Award_id_seq" OWNED BY public."Award".id;


--
-- Name: Country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Country" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Country" OWNER TO postgres;

--
-- Name: Country_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Country_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Country_id_seq" OWNER TO postgres;

--
-- Name: Country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Country_id_seq" OWNED BY public."Country".id;


--
-- Name: Drama; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Drama" (
    id integer NOT NULL,
    title text NOT NULL,
    "alternativeTitle" text,
    "urlPhoto" text,
    year integer NOT NULL,
    synopsis text,
    availability text NOT NULL,
    "trailerLink" text,
    rating double precision,
    "countryId" integer NOT NULL,
    views integer NOT NULL,
    duration integer NOT NULL
);


ALTER TABLE public."Drama" OWNER TO postgres;

--
-- Name: Drama_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Drama_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Drama_id_seq" OWNER TO postgres;

--
-- Name: Drama_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Drama_id_seq" OWNED BY public."Drama".id;


--
-- Name: Genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Genre" (
    id integer NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public."Genre" OWNER TO postgres;

--
-- Name: Genre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Genre_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Genre_id_seq" OWNER TO postgres;

--
-- Name: Genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Genre_id_seq" OWNED BY public."Genre".id;


--
-- Name: PasswordResetToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PasswordResetToken" (
    id integer NOT NULL,
    email text NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer,
    expiration timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."PasswordResetToken" OWNER TO postgres;

--
-- Name: PasswordResetToken_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PasswordResetToken_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PasswordResetToken_id_seq" OWNER TO postgres;

--
-- Name: PasswordResetToken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PasswordResetToken_id_seq" OWNED BY public."PasswordResetToken".id;


--
-- Name: Review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Review" (
    id integer NOT NULL,
    "userName" text NOT NULL,
    rating integer NOT NULL,
    comment text NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "dramaId" integer NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."Review" OWNER TO postgres;

--
-- Name: Review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Review_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Review_id_seq" OWNER TO postgres;

--
-- Name: Review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Review_id_seq" OWNED BY public."Review".id;


--
-- Name: Role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Role" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Role" OWNER TO postgres;

--
-- Name: Role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Role_id_seq" OWNER TO postgres;

--
-- Name: Role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    email text NOT NULL,
    password text,
    "roleId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    username text NOT NULL,
    id integer NOT NULL,
    "isSuspended" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _ActorToDrama; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_ActorToDrama" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_ActorToDrama" OWNER TO postgres;

--
-- Name: _DramaToGenre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_DramaToGenre" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_DramaToGenre" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Actor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Actor" ALTER COLUMN id SET DEFAULT nextval('public."Actor_id_seq"'::regclass);


--
-- Name: Award id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Award" ALTER COLUMN id SET DEFAULT nextval('public."Award_id_seq"'::regclass);


--
-- Name: Country id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Country" ALTER COLUMN id SET DEFAULT nextval('public."Country_id_seq"'::regclass);


--
-- Name: Drama id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Drama" ALTER COLUMN id SET DEFAULT nextval('public."Drama_id_seq"'::regclass);


--
-- Name: Genre id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Genre" ALTER COLUMN id SET DEFAULT nextval('public."Genre_id_seq"'::regclass);


--
-- Name: PasswordResetToken id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PasswordResetToken" ALTER COLUMN id SET DEFAULT nextval('public."PasswordResetToken_id_seq"'::regclass);


--
-- Name: Review id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review" ALTER COLUMN id SET DEFAULT nextval('public."Review_id_seq"'::regclass);


--
-- Name: Role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Actor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Actor" (id, name, photo, "countryId") FROM stdin;
1	Si├ón Eirian	http://example.com/placeholder.jpg	1
2		http://example.com/placeholder.jpg	1
3	Takuya Kimura	http://example.com/placeholder.jpg	1
4	Kim Ji-yeon	http://example.com/placeholder.jpg	1
9	David Hobbs	http://example.com/placeholder.jpg	1
14	Michael Wallis	http://example.com/placeholder.jpg	1
17	Paul Dooley	http://example.com/placeholder.jpg	1
23	Hong Shang	http://example.com/placeholder.jpg	1
26	Seo Jae Hee	http://example.com/placeholder.jpg	1
27	Ian Hart	http://example.com/placeholder.jpg	1
36	Hitosho Takagi	http://example.com/placeholder.jpg	1
37	Noriko Hidaka	http://example.com/placeholder.jpg	1
39	Sylvie Hoeks	http://example.com/placeholder.jpg	1
44	Michel Michelis	http://example.com/placeholder.jpg	1
46	Jack Reynor	http://example.com/placeholder.jpg	1
47	Cai Puri-Evans	http://example.com/placeholder.jpg	1
49	Chika Sakamoto	http://example.com/placeholder.jpg	1
50	Harshaali Malhotra	http://example.com/placeholder.jpg	1
55	Tatsuya Gash├╗in	http://example.com/placeholder.jpg	1
57	Danila Kozlovzskiy	http://example.com/placeholder.jpg	1
59	Darrell Waltrip	http://example.com/placeholder.jpg	1
61	Elie Docter.	http://example.com/placeholder.jpg	1
62	Peter Jacobson	http://example.com/placeholder.jpg	1
63	Nicola Peltz Beckham	http://example.com/placeholder.jpg	1
70	Dave Bautista	http://example.com/placeholder.jpg	1
71	Xianglong Meng	http://example.com/placeholder.jpg	1
73	Rupert Grint	http://example.com/placeholder.jpg	1
74	Jeremy Piven	http://example.com/placeholder.jpg	1
75	Cheech Marin	http://example.com/placeholder.jpg	1
83	Robin Wright	http://example.com/placeholder.jpg	1
86	Delroy Lindo	http://example.com/placeholder.jpg	1
90	Anthony Mackie. Kevin Durand	http://example.com/placeholder.jpg	1
91	Yurika Ishida	http://example.com/placeholder.jpg	1
93	Joe Ranft	http://example.com/placeholder.jpg	1
94	Yuko Tanaka	http://example.com/placeholder.jpg	1
97	Kim Tae-Ri	http://example.com/placeholder.jpg	1
103	Ye Sun	http://example.com/placeholder.jpg	1
107	Harrison Ford	http://example.com/placeholder.jpg	1
111	Brent Musburger	http://example.com/placeholder.jpg	1
112	Jenifer Lewis	http://example.com/placeholder.jpg	1
114	Richard Petty	http://example.com/placeholder.jpg	1
118	Choi Hyun-Wook	http://example.com/placeholder.jpg	1
124	Heledd Jarman	http://example.com/placeholder.jpg	1
125	Olga Fonda	http://example.com/placeholder.jpg	1
127	Owen Wilson	http://example.com/placeholder.jpg	1
129	Kim Hye Eun	http://example.com/placeholder.jpg	1
133	Youji Matsuda	http://example.com/placeholder.jpg	1
137	Jared Leto	http://example.com/placeholder.jpg	1
140	Guido Quaroni	http://example.com/placeholder.jpg	1
147	Paul Newman	http://example.com/placeholder.jpg	1
149	Larry the Cable Guy	http://example.com/placeholder.jpg	1
150	Hope Davis	http://example.com/placeholder.jpg	1
151	James Rebhorn	http://example.com/placeholder.jpg	1
154	Dawei Shen	http://example.com/placeholder.jpg	1
156	George Carlin	http://example.com/placeholder.jpg	1
159	Michael Keaton	http://example.com/placeholder.jpg	1
161	Thomas Kretschmann	http://example.com/placeholder.jpg	1
162	Franco Nero	http://example.com/placeholder.jpg	1
165	Ryan Gosling	http://example.com/placeholder.jpg	1
166	Chieko Baish├┤	http://example.com/placeholder.jpg	1
167	Tony Shalhoub	http://example.com/placeholder.jpg	1
169	Robbie Cltrane	http://example.com/placeholder.jpg	1
170	Bonnie Hunt	http://example.com/placeholder.jpg	1
175	Stanley Tucci	http://example.com/placeholder.jpg	1
177	Cristela Alonzo	http://example.com/placeholder.jpg	1
182	Emily Mortimer	http://example.com/placeholder.jpg	1
185	Evangeline Lilly	http://example.com/placeholder.jpg	1
188	Lee Joo-Myoung	http://example.com/placeholder.jpg	1
190	Eddie Izzard	http://example.com/placeholder.jpg	1
191	Ana de Armas	http://example.com/placeholder.jpg	1
201	Fiona Shar	http://example.com/placeholder.jpg	1
202	Michael Caine	http://example.com/placeholder.jpg	1
212	Filipp Avdeev	http://example.com/placeholder.jpg	1
213	Maggie Smith	http://example.com/placeholder.jpg	1
221	David Kaye	http://example.com/placeholder.jpg	1
224	Mark Arnold	http://example.com/placeholder.jpg	1
227	Jerome Ranft	http://example.com/placeholder.jpg	1
233	Yig Huang	http://example.com/placeholder.jpg	1
237	Richard Harris	http://example.com/placeholder.jpg	1
238	Katherine Helmond	http://example.com/placeholder.jpg	1
239	Bob Custas	http://example.com/placeholder.jpg	1
244	Bob Peterson	http://example.com/placeholder.jpg	1
248	Titus Wellver	http://example.com/placeholder.jpg	1
249	Harry Melling	http://example.com/placeholder.jpg	1
250	Guanlin Ji	http://example.com/placeholder.jpg	1
256	Edward Asner	http://example.com/placeholder.jpg	1
257	Jiao Xu	http://example.com/placeholder.jpg	1
260	Dakota Goyo	http://example.com/placeholder.jpg	1
261	Ravshana Kurkova	http://example.com/placeholder.jpg	1
266	Tomas	http://example.com/placeholder.jpg	1
268	Daniel Radcliffe	http://example.com/placeholder.jpg	1
269	Nam Joo-Hyuk	http://example.com/placeholder.jpg	1
271	Zitong Xia	http://example.com/placeholder.jpg	1
276	Joe Mantegna	http://example.com/placeholder.jpg	1
277	Jordan Nagai	http://example.com/placeholder.jpg	1
279	Joo Bo Young	http://example.com/placeholder.jpg	1
284	Karl Yune	http://example.com/placeholder.jpg	1
285	Christopher Plummer	http://example.com/placeholder.jpg	1
294	Salman Khan	http://example.com/placeholder.jpg	1
298	Hugh Jackman	http://example.com/placeholder.jpg	1
302	Jeff Garlin	http://example.com/placeholder.jpg	1
305	Patrick Walker	http://example.com/placeholder.jpg	1
309	Lee Yea Jin	http://example.com/placeholder.jpg	1
310	Oksana Akinshina	http://example.com/placeholder.jpg	1
312	Emma Watson	http://example.com/placeholder.jpg	1
148	Aml Ameen	https://image.tmdb.org/t/p/w500/wQ5zWlzmhvp2wG6gJiqoocEYHPJ.jpg	1
116	Blake Cooper	https://image.tmdb.org/t/p/w500/mFGnJZk83mOEF7duAi4uiaCcYvw.jpg	1
168	Dylan O'Brien	https://image.tmdb.org/t/p/w500/xN3GdvIlqsR838gDoblhPH0numP.jpg	1
67	Ki Hong Lee	https://image.tmdb.org/t/p/w500/96zkB3e07LB1hw2segekZS1PlQb.jpg	1
153	Thomas Brodie-Sangster	https://image.tmdb.org/t/p/w500/ovfgjgaE7aAXKYaemABX6pJFwRk.jpg	1
65	Kaya Scodelario	https://image.tmdb.org/t/p/w500/oKsGrXKGrcVoQJQ6pbjZDPOQJcM.jpg	1
60	Jacob Lofland	https://image.tmdb.org/t/p/w500/hlDVsEhgvNX5xnAcqX3HaBXAgNS.jpg	1
193	Rosa Salazar	https://image.tmdb.org/t/p/w500/f8MITeVNUrP9mMiXcPnCEZTIW56.jpg	1
58	Giancarlo Esposito	https://image.tmdb.org/t/p/w500/lBvDQZjxhIGMbH61iHnqerpbqHc.jpg	1
85	Will Poulter	https://image.tmdb.org/t/p/w500/9blYMaj79VGC6BHTLmJp3V5S8r3.jpg	1
123	Kate Winslet	https://image.tmdb.org/t/p/w500/e3tdop3WhseRnn8KwMVLAV25Ybv.jpg	1
194	Ray Stevenson	https://image.tmdb.org/t/p/w500/msafbswGI6uisRuNvQ8a1wMF5Ca.jpg	1
287	Ashley Judd	https://image.tmdb.org/t/p/w500/dofk0Y9YnGfoakFOonxoyFD7LOC.jpg	1
42	Shailene Woodley	https://image.tmdb.org/t/p/w500/tqNlTcDxDFQOQi0GpEtx0lqQyWt.jpg	1
120	Theo James	https://image.tmdb.org/t/p/w500/lSC4cMhcQeCjPFkK6qCjSGDSeR3.jpg	1
215	Ansel Elgort	https://image.tmdb.org/t/p/w500/pbU6qz8eudly20UE6u9T7jUXTgT.jpg	1
128	Jai Courtney	https://image.tmdb.org/t/p/w500/mwQ7aNiPYAbVi9jAEr99On7Y4zb.jpg	1
12	Tony Goldwyn	https://image.tmdb.org/t/p/w500/A3hXimbzDtFxQ1PXNo8gG7RZeN4.jpg	1
245	Karl Urban	https://image.tmdb.org/t/p/w500/7Y96dAfg0HcFrcLjlD5eD9N0uj4.jpg	1
219	Jack Quaid	https://image.tmdb.org/t/p/w500/320qW5yEbxpmyxQ3evmClJbtKag.jpg	1
315	Antony Starr	https://image.tmdb.org/t/p/w500/dyTQZSc6Jl7Ph1PvCTW7cx4ByIY.jpg	1
262	Erin Moriarty	https://image.tmdb.org/t/p/w500/dG7gLzlZCjZkjKMyoGIL8h5wjRj.jpg	1
98	Jessie T. Usher	https://image.tmdb.org/t/p/w500/b89iO2gzonAVUIPz7O29R53Yd6A.jpg	1
146	Laz Alonso	https://image.tmdb.org/t/p/w500/nmgOd3X2Xn3jIp9OLCRJzLExRWN.jpg	1
246	Chace Crawford	https://image.tmdb.org/t/p/w500/lZiIfkUmZoG1q6qKn79lVl9yaJn.jpg	1
40	Tomer Capone	https://image.tmdb.org/t/p/w500/r6s7dkYZUJpd00C7p9itT6Gp8XB.jpg	1
21	Karen Fukuhara	https://image.tmdb.org/t/p/w500/39xZ0fJEfq9Ql2fILUUDJmcHT15.jpg	1
113	Dylan Minnette	https://image.tmdb.org/t/p/w500/lGbZoPGTO4JYsiEXNtKpdEp6oMb.jpg	1
95	Christian Navarro	https://image.tmdb.org/t/p/w500/3GbOZdjoSVE2dkti9MKx44HidRi.jpg	1
141	Alisha Boe	https://image.tmdb.org/t/p/w500/qsg2aGkJ25fD67AnVdQZB6Ho8CX.jpg	1
92	Brandon Flynn	https://image.tmdb.org/t/p/w500/b1pEWBm0g2dxoNg1hX2d8My92Q8.jpg	1
229	Justin Prentice	https://image.tmdb.org/t/p/w500/yPH93Xgg5otKrDMn3Pb1Xbd8Yhm.jpg	1
234	Ross Butler	https://image.tmdb.org/t/p/w500/asJ1bchERNBwcWS3Do7xSaYNOmX.jpg	1
199	Devin Druid	https://image.tmdb.org/t/p/w500/nX5sYqPUNEpLTy2N3ndzKlCwnlD.jpg	1
171	Amy Hargreaves	https://image.tmdb.org/t/p/w500/jwE1G6jVtBi20ZGjC8U4GOWSIxw.jpg	1
25	Miles Heizer	https://image.tmdb.org/t/p/w500/fQeByexqxm2W6u9p1bMRNy12VtH.jpg	1
8	Joseph Gordon-Levitt	https://image.tmdb.org/t/p/w500/msb9UCBqBjGC95r7jns9K0C820h.jpg	1
115	Zooey Deschanel	https://image.tmdb.org/t/p/w500/30KQyjsXfrdm4Dcori7bDFTg9Le.jpg	1
155	Geoffrey Arend	https://image.tmdb.org/t/p/w500/bpqF3V5lK5GxuIU4VuTaVaztIvw.jpg	1
106	Chlo├½ Grace Moretz	https://image.tmdb.org/t/p/w500/2Tlg632tAkfZNlnoF8CV8F9Pf63.jpg	1
121	Matthew Gray Gubler	https://image.tmdb.org/t/p/w500/tHjIUjHFjl4Kzc4XQ7JSd1EHYSU.jpg	1
265	Clark Gregg	https://image.tmdb.org/t/p/w500/nbxFbr2SaF4Sdc6HdsF193GInvJ.jpg	1
291	Patricia Belcher	https://image.tmdb.org/t/p/w500/8h5cLajSjv3fLIeAyuYyNxj7gte.jpg	1
236	Rachel Boston	https://image.tmdb.org/t/p/w500/lXsexhIX8oMhPnO85M0ocL0GhC2.jpg	1
197	Minka Kelly	https://image.tmdb.org/t/p/w500/AqiOBB4dF29sLjcnuV2QSvl2r1y.jpg	1
225	Benedict Cumberbatch	https://image.tmdb.org/t/p/w500/fBEucxECxGLKVHBznO0qHtCGiMO.jpg	1
281	Martin Freeman	https://image.tmdb.org/t/p/w500/vhs7quOGDG2mtFHvL7Lu7rU2dED.jpg	1
282	Una Stubbs	https://image.tmdb.org/t/p/w500/bz23ewpBlZNgSwCLqKPaa8ulKfQ.jpg	1
101	Rupert Graves	https://image.tmdb.org/t/p/w500/6tS8XMuTS04xXTfeWFjJED6SFBF.jpg	1
253	Louise Brealey	https://image.tmdb.org/t/p/w500/c7K2WWGZVA4tKWT0gBcPoLwmz3C.jpg	1
180	Mark Gatiss	https://image.tmdb.org/t/p/w500/jf6vBlhsDbKR8N3rjl5ulqz9ltB.jpg	1
56	Andrew Scott	https://image.tmdb.org/t/p/w500/4F8XpjyQCvtuu21WFm5d8RF5Rl.jpg	1
293	Amanda Abbington	https://image.tmdb.org/t/p/w500/aANxORdYZkGTUvhWOBAXk4iM92t.jpg	1
205	Jonathan Aris	https://image.tmdb.org/t/p/w500/46T3x7CePc22Z5KvkR4OulmVORU.jpg	1
72	Ashton Kutcher	https://image.tmdb.org/t/p/w500/LvIpFJZDNjRKD5Nl9QAaRxYIiv.jpg	1
11	Melora Walters	https://image.tmdb.org/t/p/w500/FSxiDBekrKgmzow1j3UhmNHOhI.jpg	1
110	Amy Smart	https://image.tmdb.org/t/p/w500/pkLFedmz2uMEb6EahyTazuelqKU.jpg	1
295	Elden Henson	https://image.tmdb.org/t/p/w500/8U5g30U76UJe0erbJdWjGLVz7NF.jpg	1
132	William Lee Scott	https://image.tmdb.org/t/p/w500/p6mISLnDP84gaBOiXSpOenFO8Zd.jpg	1
270	John Patrick Amedori	https://image.tmdb.org/t/p/w500/is4Tvt9xLdWa29AvgHTsOykLB1T.jpg	1
222	Irina Gorovaia	https://image.tmdb.org/t/p/w500/1DVczDp4n6Vv16TvuCcRfjhtSQY.jpg	1
43	Kevin G. Schmidt	https://image.tmdb.org/t/p/w500/tRRGseAd5mjHAPG75deffeE8ZKb.jpg	1
135	Jesse James	https://image.tmdb.org/t/p/w500/icZHNGVvuSCthiql6sB0jC6ppZc.jpg	1
131	Iqbaal Dhiafakhri Ramadhan	https://image.tmdb.org/t/p/w500/AoETtoy7K04cRCtPrGBKTQjJ6BV.jpg	1
64	Angga Yunanda	https://image.tmdb.org/t/p/w500/1M3cLNTQLL1Vy6UbO9Er7FMqbND.jpg	1
274	Rachel Amanda	https://image.tmdb.org/t/p/w500/c2Ts2WgLSUUZV6xTmptKruPhQNW.jpg	1
32	Umay Shahab	https://image.tmdb.org/t/p/w500/i0Xvofb6qclnkXQayZKycMB1AVO.jpg	1
189	Aghniny Haque	https://image.tmdb.org/t/p/w500/5pFyssmQGxxCu5geM4WgCBJGrcU.jpg	1
255	Ari Irham	https://image.tmdb.org/t/p/w500/1GL3vMkA2MedpOskKMsNXTmZ2GO.jpg	1
54	Ganindra Bimo	https://image.tmdb.org/t/p/w500/6nsI1LCCadVaMKjKI5UAUiOwgae.jpg	1
145	Andrea Dian	https://image.tmdb.org/t/p/w500/7G9jaBQ437o4GSbefmsUHwjcOQv.jpg	1
208	Tio Pakusadewo	https://image.tmdb.org/t/p/w500/uAbKPJPbXVg1pi1bAEEkaMxc0Br.jpg	1
192	Millie Bobby Brown	https://image.tmdb.org/t/p/w500/3Qblbk5JIMxzlGVd1k1ucSKK7rf.jpg	1
82	Finn Wolfhard	https://image.tmdb.org/t/p/w500/5OVmquAk0W5BIsRlVKslEP497JD.jpg	1
290	Winona Ryder	https://image.tmdb.org/t/p/w500/zjwpCIeaFumamhhqz90ExqsBNqE.jpg	1
311	David Harbour	https://image.tmdb.org/t/p/w500/chPekukMF5SNnW6b22NbYPqAStr.jpg	1
33	Gaten Matarazzo	https://image.tmdb.org/t/p/w500/sUHpObjk9EkRVfpAY0auTZj3xx5.jpg	1
304	Caleb McLaughlin	https://image.tmdb.org/t/p/w500/6YjorSZyqFBl3f4sgcCQmOc1yoi.jpg	1
34	Natalia Dyer	https://image.tmdb.org/t/p/w500/bR65dHhAEod0TpBsuq5cpQH0Lai.jpg	1
7	Charlie Heaton	https://image.tmdb.org/t/p/w500/8Se6WZuvRmoB990bT29OPgVAyBo.jpg	1
217	Noah Schnapp	https://image.tmdb.org/t/p/w500/3GSWWrqQjio6G8L42ugGBGNks37.jpg	1
22	Kento Yamazaki	https://image.tmdb.org/t/p/w500/nUWXgjDfRxFJ3P20lyMJr8qDIJ0.jpg	1
19	Tao Tsuchiya	https://image.tmdb.org/t/p/w500/n2665l3bguzDTm5CnyP99ipU9Z0.jpg	1
230	Nijir├┤ Murakami	https://image.tmdb.org/t/p/w500/ixKuljx33a5JqY28CsdEavflS1b.jpg	1
172	Eleanor Noble	https://image.tmdb.org/t/p/w500/kCbQ95ZhPN5hpSIcpaA2p80M2gl.jpg	1
252	Daniel Rindress-Kay	https://image.tmdb.org/t/p/w500/bnftfIvk8m39BPFdYR53TgpeWPv.jpg	1
163	Aya Asahina	https://image.tmdb.org/t/p/w500/zF3la0KvayUV3uACYPiBgCRIQcI.jpg	1
251	Daniel Brochu	https://image.tmdb.org/t/p/w500/u1Y4I2b3LhjAHTBMdNh7jgN6NED.jpg	1
18	Juliette Gosselin	https://image.tmdb.org/t/p/w500/mee5liXgHklccsrP8alyWJw7gGy.jpg	1
13	Y├╗tar├┤ Watanabe	https://image.tmdb.org/t/p/w500/vAigHgkc3r4SmFCk7rmwHb0y2n.jpg	1
81	Sul Kyung Gu	https://image.tmdb.org/t/p/w500/9SqQcvVUPUziK37i5jIeUoqSOMB.jpg	1
100	Doh Kyung Soo	https://image.tmdb.org/t/p/w500/qjeam8N9lJU6dXtNoJi4PLfEGmn.jpg	1
28	Kim Hee Ae	https://image.tmdb.org/t/p/w500/69uUEdttLULH1yJ0pne2vxjWIXV.jpg	1
283	Park Byung Eun	https://image.tmdb.org/t/p/w500/8lDiEHjbBxPD8VNu1kGifMXhPUn.jpg	1
79	Jo Han Chul	https://image.tmdb.org/t/p/w500/sk0pVWe5wOAX6dVRzPkxMysfVWr.jpg	1
134	Choi Byung Mo	https://image.tmdb.org/t/p/w500/eANEWvYi7yBygB2CjNHgZIX9EmA.jpg	1
142	Hong Seung Hee	https://image.tmdb.org/t/p/w500/iF8vAp98sUh0CQ07mhrCB4euHPR.jpg	1
29	Choi Jung Woo	https://image.tmdb.org/t/p/w500/doHUwUDRML1uo0PVVRXblGAJhN3.jpg	1
303	Lee Sung Min	https://image.tmdb.org/t/p/w500/uYtqhJp4qNc6Ermi1tKruS0Hkuo.jpg	1
31	Kelsey Grammer	https://image.tmdb.org/t/p/w500/cjUCogoFRnFKAgeyRmGGpekz0TF.jpg	1
207	Jim Varney	https://image.tmdb.org/t/p/w500/zvBFmvKUrPvE6FW35O3RP4i1ZPp.jpg	1
214	Erik von Detten.	https://image.tmdb.org/t/p/w500/7fHjKnLKmqzR0kmvRPLxpQE7BsK.jpg	1
51	Don Rickles	https://image.tmdb.org/t/p/w500/iJLQV4dcbTUgxlWJakjDldzlMXS.jpg	1
66	Annie Potts	https://image.tmdb.org/t/p/w500/tlGnlsTOLiGO5xNGEnTZI4psmEp.jpg	1
41	John Morris	https://image.tmdb.org/t/p/w500/lSdNMhN3DoXEQJ37IeOD5mTMUQK.jpg	1
198	Jodi Benson	https://image.tmdb.org/t/p/w500/2qX8QKHCaFWnCcIhb3VgZeX9HPz.jpg	1
184	Tim Allen	https://image.tmdb.org/t/p/w500/PGLz0YLg4eB49BA6QxzHF5czxX.jpg	1
299	Joan Cusack	https://image.tmdb.org/t/p/w500/59UIeHZFYrKyP20lXqijtfTXglO.jpg	1
179	Wallace Shawn	https://image.tmdb.org/t/p/w500/wVaM1WlFKDce4esThwL4XtNLhOe.jpg	1
240	John Ratzenberger	https://image.tmdb.org/t/p/w500/oRtDEOuIO1yDhTz5dORBdxXuLMO.jpg	1
210	Keanu Reeves	https://image.tmdb.org/t/p/w500/4D0PpNI0kmP58hgrwGC3wCjxhnm.jpg	1
16	Tony Hale	https://image.tmdb.org/t/p/w500/ar4uapp4w5wMkThZcqWUNMSTO8z.jpg	1
99	Jordan Peele	https://image.tmdb.org/t/p/w500/kFUKn5g3ebpyZ3CSZZZo2HFWRNQ.jpg	1
307	Annie Potts.	https://image.tmdb.org/t/p/w500/tlGnlsTOLiGO5xNGEnTZI4psmEp.jpg	1
258	Santino Fontana	https://image.tmdb.org/t/p/w500/5wo0D9drLtLwdyZyDqNZRejgzoM.jpg	1
35	Kristen Bell	https://image.tmdb.org/t/p/w500/rP74dJXl7EjinGM0shQtUOlH5s2.jpg	1
242	Idina Menzel	https://image.tmdb.org/t/p/w500/dY4Uev9Z8DWEh2lAKrz7YyVNDQC.jpg	1
10	Josh Gad	https://image.tmdb.org/t/p/w500/17iKlfWZBDTAucqjkhRKHr9xjIz.jpg	1
80	Jonathan Groff	https://image.tmdb.org/t/p/w500/3kmnYKAzSc3Lp7iK5pcj97Hx9Cm.jpg	1
158	Noriaki Sugiyama	https://image.tmdb.org/t/p/w500/szqqQ8T0gzuSxjU2rnWcthsaSJT.jpg	1
38	Noriko Shitaya	https://image.tmdb.org/t/p/w500/apIw7RO7gz4QFIE94t1Dx83AD2L.jpg	1
173	Ayako Kawasumi	https://image.tmdb.org/t/p/w500/vb4cgQUlZdaZT3P4RI27x2PGwpH.jpg	1
164	Kana Ueda	https://image.tmdb.org/t/p/w500/us6FMwXCeSUR2YyByxVcgOUjiIA.jpg	1
76	J├┤ji Nakata	https://image.tmdb.org/t/p/w500/wYhv4BtQnc6bZp2Qnh6GiYjmNKC.jpg	1
273	Miyu Irino	https://image.tmdb.org/t/p/w500/8qEEhHUObNvGQr4e6eqLu5z4qTz.jpg	1
178	Rumi Hiiragi	https://image.tmdb.org/t/p/w500/zITaVtFyc4xSM3mxSoPRWHbqgJI.jpg	1
15	Mari Natsuki	https://image.tmdb.org/t/p/w500/aRs3dGqA2bCuGSZ7lJGhQKe8rhp.jpg	1
139	Soma Santoki	https://image.tmdb.org/t/p/w500/g4I9g3IRcbxqTqDuOtgG9QicvfB.jpg	1
297	Masaki Suda	https://image.tmdb.org/t/p/w500/g7gXu0bE9jZ5LHjSqn1zHdNtiA1.jpg	1
30	Kou Shibasaki	https://image.tmdb.org/t/p/w500/gcuJz8dbYjtgsL8CAWMjVd5R7B9.jpg	1
223	Ranbir Kapoor	https://image.tmdb.org/t/p/w500/ymYNHV9luwgyrw17NXHqbOWTQkg.jpg	1
235	Aishwarya Rai Bachchan	https://image.tmdb.org/t/p/w500/31L3uTQSeLS5g3EgALNdVbZT1W.jpg	1
69	Fawad Khan	https://image.tmdb.org/t/p/w500/zHvstgZfyb5AwEQfrWHV3bsjKV1.jpg	1
77	Alia Bhatt	https://image.tmdb.org/t/p/w500/fgID7oesvlmOa6zGnZY4bMrvFAW.jpg	1
211	Jaya Bachchan	https://image.tmdb.org/t/p/w500/nt9LBdPmI3lU1uAyko8FStnf1Xb.jpg	1
130	Saif Ali Khan	https://image.tmdb.org/t/p/w500/85uKiFDEcIqzLh0GwqYvecXw4uA.jpg	1
308	Preity Zinta	https://image.tmdb.org/t/p/w500/qY4GG9zj4JhgoiBaHhT5FIGeHu3.jpg	1
117	Hrithik Roshan	https://image.tmdb.org/t/p/w500/upKrdABAMK7jZevWAoPYI24iKlR.jpg	1
220	Kareena Kapoor	https://image.tmdb.org/t/p/w500/pJZJJ93NwJq3kb3RWtaZBYVga1x.jpg	1
280	Kajol	https://image.tmdb.org/t/p/w500/h4m0TkDuEMCUNaPrQxMRyFb2AQ7.jpg	1
136	Amitabh Bachchan	https://image.tmdb.org/t/p/w500/u69PvpWqGkywSm0YjFiw77j9eqS.jpg	1
275	Shah Rukh Khan	https://image.tmdb.org/t/p/w500/tCEppfUu0g2Luu0rS5VKMoL4eSw.jpg	1
232	Katrina Kaif	https://image.tmdb.org/t/p/w500/sGxjQQ2ymrrplbRqFjwiJiUdc5w.jpg	1
203	Anushka Sharma	https://image.tmdb.org/t/p/w500/fPhX9mefBzco5ntQUZNJZG56Gbi.jpg	1
296	Megan Fox	https://image.tmdb.org/t/p/w500/smjWHgaVWUnAoxeg65gL4NE5Gnp.jpg	1
48	Ramon Rodriguez	https://image.tmdb.org/t/p/w500/1gobmVevxCWVhV7s6J2B0oWPDZj.jpg	1
187	Kevin Dunn	https://image.tmdb.org/t/p/w500/7dqLQjMNCQnuxQJQwQ5Ozz16LBq.jpg	1
160	Julie White	https://image.tmdb.org/t/p/w500/siiNmtZZldFSc2DwnfUJf0Teouh.jpg	1
87	Shia LaBeouf	https://image.tmdb.org/t/p/w500/ljlpaXEManszxIcshYQoqo4au03.jpg	1
216	Rosie Huntington-Whiteley	https://image.tmdb.org/t/p/w500/oq5iX2VoLGF41P5DmNDNJcczESR.jpg	1
174	Tyrese Gibson	https://image.tmdb.org/t/p/w500/1K315wBQBvDBuZMlzoozuGsqFXZ.jpg	1
52	John Turturro	https://image.tmdb.org/t/p/w500/6O9W9cJW0kCqMzYeLupV9oH0ftn.jpg	1
152	Patrick Dempsey	https://image.tmdb.org/t/p/w500/2PpaYtXdaDmNi3jap4qPIdyVesL.jpg	1
241	Mark Wahlberg	https://image.tmdb.org/t/p/w500/bTEFpaWd7A6AZVWOqKKBWzKEUe8.jpg	1
226	Anthony Hopkins	https://image.tmdb.org/t/p/w500/9ukJS2QWTJ22HcwR1ktMmoJ6RSL.jpg	1
254	Josh Duhamel	https://image.tmdb.org/t/p/w500/5Rp9aeWdN2S623KCjwfii9MhDK1.jpg	1
96	Laura Haddock	https://image.tmdb.org/t/p/w500/6kRUvA7N3pMzznG9PdiqCOvxhGQ.jpg	1
195	Santiago Cabrera	https://image.tmdb.org/t/p/w500/ig1nyOlNKXsRy8xggYPLMcohpJA.jpg	1
5	Isabela Merced	https://image.tmdb.org/t/p/w500/cQlaWpBzyPx4p6PDz0cr1Y0DrWY.jpg	1
218	Anthony Ramos	https://image.tmdb.org/t/p/w500/seFm2fKh6reyZaaCg7DmRpodLCw.jpg	1
313	Dominique Fishback	https://image.tmdb.org/t/p/w500/zduC0PM7xKzFX4F7DH8CCt5gt6O.jpg	1
272	Luna Lauren Velez	https://image.tmdb.org/t/p/w500/98BvmTJCZHx0jPv0oNcv04Jkmfb.jpg	1
20	Dean Scott Vazquez	https://image.tmdb.org/t/p/w500/bo4Cmv8rXIYSskIbMFbrcIedFnG.jpg	1
102	Tobe Nwigwe	https://image.tmdb.org/t/p/w500/52Zu83S7T9tkzQeQuLyLJgUoXVa.jpg	1
231	Sarah Stiles	https://image.tmdb.org/t/p/w500/t1OuHZmz9GlbFu7bfOUg3nzIki6.jpg	1
292	Minami Takayama	https://image.tmdb.org/t/p/w500/4Gunxt2UWnAX74ZoXKtqK2rI0e.jpg	1
267	Kappei Yamaguchi	https://image.tmdb.org/t/p/w500/mJyxKRZxLv9D7LH5KcNSkjSKYOB.jpg	1
84	Wakana Yamazaki	https://image.tmdb.org/t/p/w500/1hBk3w3v1p1VuAHs5On9nvL2rX2.jpg	1
105	Rikiya Koyama	https://image.tmdb.org/t/p/w500/hsZm87BORLpzhaycBaWOD5xpjVC.jpg	1
301	Megumi Hayashibara	https://image.tmdb.org/t/p/w500/qiCiLNGaJmwql2uBpjnkY5zX5T2.jpg	1
89	Ken'ichi Ogata	https://image.tmdb.org/t/p/w500/iQLEawIP2593yrGy22GzLSpnfgl.jpg	1
176	Chaf├╗rin	https://image.tmdb.org/t/p/w500/kiPG7EtYWxkj78US35gnTIMq5Dn.jpg	1
247	Wataru Takagi	https://image.tmdb.org/t/p/w500/amccLvyTl5JP7T9F05BojgQedNw.jpg	1
138	Idris Elba	https://image.tmdb.org/t/p/w500/be1bVF7qGX91a6c5WeRPs5pKXln.jpg	1
157	Charlie Hunnam	https://image.tmdb.org/t/p/w500/ibWWSRGqgxNw9SC8E8hNv1Lvob1.jpg	1
306	Rinko Kikuchi	https://image.tmdb.org/t/p/w500/lv4UuorZtC37VaFAHO205u4lS73.jpg	1
119	Diego Klattenhof	https://image.tmdb.org/t/p/w500/mpdtCA5birAW89dtkuAdR73wr2H.jpg	1
144	Max Martini	https://image.tmdb.org/t/p/w500/gehOxb2cgNjcRnbAxaCUnFFJvAY.jpg	1
314	John Boyega	https://image.tmdb.org/t/p/w500/3153CfpgZQXTzCY0i74WpJumMQe.jpg	1
228	Scott eastwood	https://image.tmdb.org/t/p/w500/hBqXeKe2Z7VnAYe7tLTzIvr8po4.jpg	1
206	Cailee Spaeny	https://image.tmdb.org/t/p/w500/nquUc6o2dK4Pg4zjvl2HmZOfiRS.jpg	1
78	Burn Gorman	https://image.tmdb.org/t/p/w500/nl5V2mpfTnp8YSShtVYjgNjnv4M.jpg	1
122	Charlie Day	https://image.tmdb.org/t/p/w500/c0HNhjChGybnHa4eoLyqO4dDu1j.jpg	1
68	Tian Jing	https://image.tmdb.org/t/p/w500/nNlM15XOEJU8A1dKuGEnN7NgxEy.jpg	1
108	Jin Zhang	https://image.tmdb.org/t/p/w500/wk2iVLysBOkQxBGX6fkCYOq36r6.jpg	1
143	Audrey Tautou	https://image.tmdb.org/t/p/w500/moh0My0K3BP4d6AZx7jkPKqRORT.jpg	1
286	Jean Reno	https://image.tmdb.org/t/p/w500/dEQGpWhgRAN1xU8O1jyOVuQTHwo.jpg	1
259	Ian McKellen	https://image.tmdb.org/t/p/w500/5cnnnpnJG6TiYUSS7qgJheUZgnv.jpg	1
88	Paul Bettany	https://image.tmdb.org/t/p/w500/oNrDowF5cRtK5lJJuCAh0KeFizy.jpg	1
186	Alfred Molina	https://image.tmdb.org/t/p/w500/nJo91Czesn6z0d0pkfbDoVZY3sg.jpg	1
196	Tom Hanks	https://image.tmdb.org/t/p/w500/eKF1sGJRrZJbfBG1KirPt1cfNd3.jpg	1
200	Felicity Jones	https://image.tmdb.org/t/p/w500/35KdWSfTldNEdsn4MUGFIRoxJEu.jpg	1
53	Irrfan Khan	https://image.tmdb.org/t/p/w500/qkA9PpWJRw3rNjVkWfNZdwLvRZx.jpg	1
288	Ben Foster	https://image.tmdb.org/t/p/w500/4le1PMWTGp7y2IBmZEIOHfE3HAB.jpg	1
263	Omar Sy	https://image.tmdb.org/t/p/w500/laNZay6AfEzvEvY1NUH9UFiSD0a.jpg	1
181	Ana Ularu	https://image.tmdb.org/t/p/w500/oWMWDIZbiQWkIlxkhEM3RVzZclc.jpg	1
126	Ida Darvish	https://image.tmdb.org/t/p/w500/u0IusSD8zHVfhW4Uz7YjismbskA.jpg	1
264	Ryan Reynolds	https://image.tmdb.org/t/p/w500/algQ1VEno2W9SesoArWcZTeF617.jpg	1
316	Melanie Laurent	https://image.tmdb.org/t/p/w500/i99ogEo4gQyanCmHWYYoS6hsUqL.jpg	1
243	Manuel Garcia Rulfo	https://image.tmdb.org/t/p/w500/54Rk1hKfNdNKGHQMnONDGmNtUv3.jpg	1
289	Ben Hardy	https://image.tmdb.org/t/p/w500/b20ijbr2tbqlGvqZgkCpNZ5AYvS.jpg	1
109	Adria Arjona	https://image.tmdb.org/t/p/w500/gzrI92WZFANIBXOmXl3QGfb8Jak.jpg	1
24	Chris Hemsworth	https://image.tmdb.org/t/p/w500/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg	1
300	Anya Taylor-Joy	https://image.tmdb.org/t/p/w500/yZpghhtKM2VZHDx6JGAZqAVU4PL.jpg	1
104	Tom Burke	https://image.tmdb.org/t/p/w500/9L2O1mAwFQcfEbaB5CHIZUvnqUW.jpg	1
183	Alyla Browne	https://image.tmdb.org/t/p/w500/tcAQAzqk1z0PsVXqi8HODOVPQoY.jpg	1
209	Bruno Ganz	https://image.tmdb.org/t/p/w500/siuPo91XYmYLXeCdq2DZTyNtpYq.jpg	1
204	Alexandra Maria Lara	https://image.tmdb.org/t/p/w500/whFI0dPAyXdUvGfnXcKf8W40mgk.jpg	1
6	Ulrich Matthes	https://image.tmdb.org/t/p/w500/wghkMqyMfaK1yWzwi142LJiJnBM.jpg	1
45	Juliane Kohler	https://image.tmdb.org/t/p/w500/v2eHSiEdAhu2mJWxEwa3Sqxtgg1.jpg	1
278	Corinna Harfouch	https://image.tmdb.org/t/p/w500/vPs5o94S0as2VSnj4JSATnNTmZa.jpg	1
\.


--
-- Data for Name: Award; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Award" (id, name, year, "dramaId", "countryId") FROM stdin;
\.


--
-- Data for Name: Country; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Country" (id, name) FROM stdin;
1	United States
2	South Korea
3	Indonesia
4	Japan
5	England
6	China
7	India
8	Australia
9	Russia
10	Germany
\.


--
-- Data for Name: Drama; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Drama" (id, title, "alternativeTitle", "urlPhoto", year, synopsis, availability, "trailerLink", rating, "countryId", views, duration) FROM stdin;
42	Jab Tak Hai Jaan	-	https://posters.movieposterdb.com/12_09/2012/2176013/s_2176013_f513dba4.jpg	2012	Samar Anand is forced to leave his girlfriend, Khushi (Katrina Kaif). From London, he returns to Kashmir leaving his past behind, and meets Akira, a cheerful woman who works for a television program about wildlife. Will Samar still hope for Khushi or choose to start a new life with Akira?	Prime Video, Apple TV	https://www.youtube.com/watch?v=v0UXgoJ9Shg	6.7	7	37	176
41	Kabhi Khushi Kabhie Gham	-	https://posters.movieposterdb.com/10_08/2001/248126/s_248126_0a404d08.jpg	2001	Rahul is sad because his father disapproves of his relationship with the poor Anjali, but still marries her and moves to London. 10 years later, Rahul's younger brother wants to reconcile his father and brother.	Netflix, Prime Video, Apple TV	https://www.youtube.com/watch?v=7uY1JbWZKPA	7.4	7	36	210
8	500 days of summer	-	https://posters.movieposterdb.com/09_10/2009/1022603/l_1022603_997c5a61.jpg	2009	After being dumped by the girl he believes to be his soulmate, hopeless romantic Tom Hansen reflects on their relationship to try and figure out where things went wrong and how he can win her back.	Netflix	https://www.youtube.com/watch?v=PsD0NpFSADM	7.7	1	30	95
6	The Boys	-	https://posters.movieposterdb.com/20_01/2019/1190634/l_1190634_22fcc492.jpg	2019	A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.	Prime Video	https://www.youtube.com/watch?v=5SKP1_F7ReE	8.7	1	3	60
3	Maze Runner: The Death Cure	-	https://m.media-amazon.com/images/M/MV5BMTYyNzk3MDc2NF5BMl5BanBnXkFtZTgwMDk3OTM1NDM@._V1_FMjpg_UX1000_.jpg	2018	In the epic finale to The Maze Runner Saga, Thomas leads his group of escaped Gladers on their final and most dangerous mission yet. To save their friends, they must break into the legendary last city, a WCKD controlled labyrinth that may turn out to be the deadliest maze of all. Anyone who makes it out alive will get the answers to the questions the Gladers have been asking since they first arrived in the maze. Will Thomas and the crew make it out alive? Or will Ava Paige get her way?	Netflix 	https://youtu.be/4-BTxXm8KSg?si=RHS5aQagm2ylIRLq	6.3	1	5	143
24	Frozen 1	-	https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_.jpg	2013	Fearless optimist Anna teams up with rugged mountain man Kristoff and his loyal reindeer Sven and sets off on an epic journey to find her sister Elsa, whose icy powers have trapped the kingdom of Arendelle in eternal winter. Encountering Everest-like conditions, mystical trolls and a hilarious snowman named Olaf, Anna and Kristoff battle the elements in a race to save the kingdom. From the outside Elsa looks poised, regal and reserved, but in reality she lives in fear as she wrestles with a mighty secret: she was born with the power to create ice and snow. It's a beautiful ability, but also extremely dangerous. Haunted by the moment her magic nearly killed her younger sister Anna, Elsa has isolated herself, spending every waking minute trying to suppress her growing powers. Her mounting emotions trigger the magic, accidentally setting off an eternal winter that she can't stop. She fears she's becoming a monster and that no one, not even her sister, can help her	Netflix	https://youtu.be/DSgMD4ofCmo	7.4	1	25	102
1	The Maze Runner	-	https://m.media-amazon.com/images/M/MV5BMjUyNTA3MTAyM15BMl5BanBnXkFtZTgwOTEyMTkyMjE@._V1_FMjpg_UX1000_.jpg	2014	Awakening in an elevator, remembering nothing of his past, Thomas emerges into a world of about thirty teenage boys, all without past memories, who have learned to survive under their own set of rules in a completely enclosed environment, subsisting on their own agriculture and supplies. With a new boy arriving every thirty days, the group has been in "The Glade" for three years, trying to find a way to escape through the Maze that surrounds their living space (patrolled by cyborg monsters named 'Grievers'). They have begun to give up hope when a comatose girl arrives with a strange note, and their world begins to change with the boys dividing into two factions: those willing to risk their lives to escape and those wanting to hang onto what they've got and survive.┬ùKelseyJ	Netflix 	https://youtu.be/AwwbhhjQ9Xk?si=PJjZKZH7amEgeBhA	6.8	1	4	113
26	Blade Runner 2049	Literally me	https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_.jpg	2017	Thirty years after the events of Blade Runner (1982), a new Blade Runner, L.A.P.D. Officer "K" (Ryan Gosling), unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest to find Rick Deckard (Harrison Ford), a former L.A.P.D. Blade Runner, who has been missing for thirty years.	Netflix, Prime Video, Vidio	https://www.imdb.com/video/vi2181676825/?playlistId=tt1856101&ref_=tt_ov_vi	8	1	0	164
33	Dragon Nest: Warrior's Dawn	Long Zhi Gu: Po Xiao Qi Bing	https://m.media-amazon.com/images/M/MV5BM2U5MTI4NWUtNzIyZS00NzI3LWJiYmQtOGQzYTBjYjgzN2VlXkEyXkFqcGdeQXVyNzQyNDI4MDg@._V1_.jpg	2014	Lambert joins the Dragon Slayers' League to save Altera from the Black Dragon.	Apple TV, Microsoft Store, Google Play Movies	https://youtu.be/0ak7gLnPZfw?si=ZbnsWQCARu5FjAqm	6.2	6	1	88
30	Fate/stay night [Heaven's Feel] II. lost butterfly	Gekijouban Fate/stay night [Heaven's Feel] II. lost butterfly	https://m.media-amazon.com/images/M/MV5BZjM0ZmIwNjEtNDE4YS00MDQ2LWI2ZTMtYTNkZmMwN2YyZmMwXkEyXkFqcGdeQXVyNzEyMDQ1MDA@._V1_FMjpg_UX1000_.jpg	2019	The story focuses on the Holy Grail War and explores the relationship between Shirou Emiya and Sakura Matou, two teenagers participating in this conflict. The story continues immediately from Fate/stay night: Heaven's Feel I. presage flower, following Shirou as he continues to participate in the Holy Grail War even after being eliminated as a master.	Apple TV, Microsoft Store	https://youtu.be/nfzKXkL_i54?si=zm6E1OQ54bidiUnf	7.9	4	4	117
31	Fate/stay night [Heaven's Feel] III. spring song	Gekijouban Fate/stay night [Heaven's Feel] III. spring song	https://m.media-amazon.com/images/M/MV5BYTg3MmY5MzMtNTdjYS00ZWU2LWI2ODUtOGRmZDRkMzk3MjE4XkEyXkFqcGdeQXVyMTIzNDg4NTk0._V1_QL75_UY281_CR1,0,190,281_.jpg	2020	The final chapter in the Heaven's Feel trilogy. Angra Mainyu has successfully possessed his vessel Sakura Matou. It's up to Rin, Shirou, and Rider to cleanse the grail or it will be the end of the world and magecraft as we all know it.	Apple TV, Microsoft Store, Google Play Movies	https://youtu.be/KlJIMiZfxCY?si=0Lxh1O7xkwxIXi5d	7.9	4	1	120
32	Real Steel	-	https://m.media-amazon.com/images/M/MV5BMjEzMzEzNjg0N15BMl5BanBnXkFtZTcwMzg4NDk0Ng@@._V1_FMjpg_UX1000_.jpg	2011	In a near future where robot boxing is a top sport, a struggling ex-boxer feels he's found a champion in a discarded robot.	Netflix, Hotstar, Hulu	https://youtu.be/1VFd5FMbZ64?si=ItKqmKxKBM6r4Whv	7.1	1	1	127
39	Ae Dil Hai Mushkil	-	https://posters.movieposterdb.com/21_11/2016/4559006/l_4559006_2672b3c1.jpg	2016	Ayan goes on a quest for true love when Alizeh does not reciprocate his feelings. On his journey, he meets different people who make him realize the power of unrequited love.	Netflix, Prime Video, Apple TV	https://www.youtube.com/watch?v=Z_PODraXg4E	5.8	7	1	158
58	6 Underground	-	https://m.media-amazon.com/images/M/MV5BNzE2ZjQxNjEtNmI2ZS00ZmU0LTg4M2YtYzVhYmRiYWU0YzI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg	2019	Six individuals from all around the globe, each the very best at what they do, have been chosen not only for their skill, but for a unique desire to delete their pasts to change the future.	Netflix	https://www.imdb.com/video/vi2200092441/?playlistId=tt8106534&ref_=ext_shr_lnk	6.1	1	1	128
22	Cars 2	-	https://m.media-amazon.com/images/M/MV5BMTUzNTc3MTU3M15BMl5BanBnXkFtZTcwMzIxNTc3NA@@._V1_.jpg	2011	The famous race car Lightning McQueen and his team are invited to compete in the World Grand Prix race. There, McQueen's best friend Mater finds himself involved in international espionage, and alongside two professional British spies attempts to uncover a secret plan led by a mysterious mastermind and his criminal gang, which threatens the lives of all competitors in the tournament.	Netflix	https://youtu.be/WGByijP0Leo	6.2	1	1	106
21	Cars 1	-	https://m.media-amazon.com/images/M/MV5BMzY1MjI1NjkwMl5BMl5BanBnXkFtZTcwMzQ0MTQyMw@@._V1_.jpg	2006	While traveling to California for the dispute of the final race of the Piston Cup against The King and Chick Hicks, the famous Lightning McQueen accidentally damages the road of the small town Radiator Springs and is sentenced to repair it. Lightning McQueen has to work hard and finds friendship and love in the simple locals, changing its values during his stay in the small town and becoming a true winner.	Netflix	https://youtu.be/WGByijP0Leo	7.2	1	0	116
23	Cars 3	-	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmP-nugVkCDhH4-Mpz_aw12cU779SvPfnghg&s	2017	Blindsided by a new generation of blazing-fast racers, the legendary Lightning McQueen is suddenly pushed out of the sport he loves. To get back in the game, he will need the help of an eager young race technician with her own plan to win, inspiration from the late Fabulous Hudson Hornet, and a few unexpected turns. Proving that #95 isn't through yet will test the heart of a champion on Piston Cup Racing's biggest stage!	Netflix	https://youtu.be/2LeOH9AGJQM	6.7	1	0	102
52	Detective Conan :The Lost Ship in the Sky\n\n	Meitantei Conan: Tenkuu no rosuto shippu	https://xl.movieposterdb.com/10_08/2010/1636815/xl_1636815_c926bd5b.jpg 	2010	Kid has his eyes set on the "Lady of the Sky" jewel aboard Bell 3, the largest airship in the world. However, a mysterious terrorist group called Red Shamu-neko has hijacked the airship, along with Conan and his allies Kogoro and Ran.\n	Netflix, Bstation	Detective Conan Movie 14 _ Lost Ship In The Sky OFFICIAL TRAILER - YouTube	6.9	4	0	103
60	Chernobyl: Abyss	-	https://m.media-amazon.com/images/M/MV5BMDE3ODIzMTgtOWM0My00NzI0LTliMTUtMzUxMGNhZTgxZDIzXkEyXkFqcGdeQXVyNjcxMTIwNzU@._V1_.jpg	2021	A story about a heroic fireman who worked as one of Chernobyl liquidators.	Netflix	https://www.youtube.com/watch?v=G8xJb6-ZNKM	5.2	9	1	136
14	Alice in BorderLand	Imawa no Kuni no Arisu	https://img-highend.okezone.com/okz/900/pictureArticle/images_uLI7596N_56i1fP.jpg	2020	Obsessed gamer Arisu suddenly finds himself in a strange, emptied-out version of Tokyo in which he and his friends must compete in dangerous games in order to survive.	Netflix	https://youtu.be/49_44FFKZ1M?feature=shared	7.7	4	1	50
43	Bajrangi Bhaijaan	-	https://posters.movieposterdb.com/15_09/2015/3863552/s_3863552_b160f1f4.jpg	2015	Pavan, a devotee of Hanuman, faces various challenges when he tries to reunite Munni with her family after Munni goes missing while traveling back home with her mother.	Disney+, Bstation	https://www.youtube.com/watch?v=4nwAra0mz_Q	8.1	7	0	163
49	Detective Conan Movie: The Sniper from Another Dimension\r\n\r\n	Meitantei Conan: Ijigen no Sniper	https://xl.movieposterdb.com/14_04/2014/3455204/xl_3455204_18202e5c.jpg	2014	After participating in the opening ceremony, Conan, Professor Agasa, Ran, Haibara, and the Detective Boys are enjoying the view from the observation deck of the 635-metre tall Bell Tree Tower. Suddenly, a bullet breaks through a window, strikes a man's chest and breaks a TV screen, causing everyone to panic. Conan stays calm and, using the zoom function on his tracking glasses to follow the path of the bullet to its source, spots the sniper. He and Masumi Sera, who had been present at the Tower as part of an assignment to shadow the victim, pursue the fleeing culprit on Masumi's motorcycle, but the chase takes a violent turn when the suspect uses a handgun and even hand grenades to take out his pursuers. Even the FBI get involved in the chase, but the culprit and the mysteries of the sniping end up vanishing into the ocean.	Netflix, Bstation	Detective Conan movie 18 sniper from another dimension full trailer HD - YouTube	6.7	4	1	110
7	13 Reasons Why	-	https://posters.movieposterdb.com/21_02/2017/1837492/s_1837492_8fa1eebf.jpg	2017	Follows teenager Clay Jensen, in his quest to uncover the story behind his classmate and crush, Hannah, and her decision to end her life.	Netflix	https://www.youtube.com/watch?v=QkT-HIMSrRk	7.5	1	14	60
50	Detective Conan: The Darkest Nightmare	Meitantei Conan: Junkoku no Nightmare\n	https://xl.movieposterdb.com/19_12/2016/4954660/xl_4954660_625971f4.jpg?v=2020-01-02%2013:32:54	2016	A spy infiltrated the Japanese National Police Agency, retrieving secret files of Britain's MI6, Germany's BND and America's CIA and FBI. Rei Furuya and a group of Tokyo Police PSB intercepted the spy during the getaway, and just before the major car accident, FBI Agent Shuichi Akai sniped and crashed the spy's vehicle. The next day, at the aquarium in Tokyo with the Ferris wheel, Conan and the Detective Boys found a woman with heterochromia iris who suffered memory loss and had a broken cell phone. Having decided to stay and help the woman regain her memory, Conan and the Detective Boys are under the watchful eye of Vermouth.\r	Netflix, Bstation	DETECTIVE CONAN: THE DARKEST NIGHTMARE - Official Trailer (In cinemas 7 July) - YouTube	7	4	0	112
53	Detective Conan: The Sunflower Of Inferno	Meitantei Conan: Gouka no Himawari\n	https://xl.movieposterdb.com/15_08/2015/3737650/xl_3737650_927f2a54.jpg	2015	Conan and his friends must prevent Kid from stealing a famous painting.\r\n\r	Netflix, Bstation	Detective Conan: Sunflowers of Inferno Official Trailer - YouTube	6.2	4	0	112
51	Detective Conan: Zero The Enforcer	Meitantei Conan: Zero no Shikkounin	https://xl.movieposterdb.com/20_01/2018/7880466/xl_7880466_fb8b1bfb.jpg?v=2020-01-02%2015:53:38	2018	Detective Conan investigates an explosion that occurs on the opening day of a large Tokyo resort and convention center.\r\n\r	Netflix, Bstation	DETECTIVE CONAN: ZERO THE ENFORCER Official Indonesia Trailer - YouTube	6.2	4	0	115
4	Divergent	-	https://m.media-amazon.com/images/M/MV5BMTYxMzYwODE4OV5BMl5BanBnXkFtZTgwNDE5MzE2MDE@._V1_FMjpg_UX1000_.jpg	2014	In a world divided by factions based on virtues, Tris learns she's Divergent and won't fit in. When she discovers a plot to destroy Divergents, Tris and the mysterious Four must find out what makes Divergents dangerous before it's too late.	Netflix 	https://youtu.be/Aw7Eln_xuWc?si=k4I06AV1XEC1TYzb	6.6	1	0	139
29	Fate/stay night [Heaven's Feel] I. presage flower	Gekijouban Fate/stay night [Heaven's Feel] I. presage flower	https://m.media-amazon.com/images/M/MV5BMzFjODA2Y2YtN2RiOS00OWZmLTk5NzEtOTgyZDlmYzFjZWU5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg	2017	Shirou Emiya is a young mage who attends Homurahara Academy in Fuyuki City. One day after cleaning the Archery Dojo in his school, he catches a glimpse of a fight between superhuman beings, and he gets involved in the Holy Grail War, a ritual where mages called Masters fight each other with their Servants in order to win the Holy Grail. Shirou joins the battle to stop an evildoer from winning the Grail and to save innocent people, but everything goes wrong when a mysterious "Shadow" begins to indiscriminately kill people in Fuyuki.	Crunchyroll, Apple TV, Microsoft Store	https://youtu.be/AMr5pXzpvP0?si=Wrqrp_iXyxIG4dw5	7.4	4	1	120
61	Downfall	Der Untergang	data:image/jpeg;base64,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	2004	Traudl Junge, the final secretary for Adolf Hitler, tells of the Nazi dictator's final days in his Berlin bunker at the end of WWII.	Prime Video	https://www.youtube.com/watch?v=htvYfe6wz_8	8.2	10	2	156
38	Howl's Moving Castle	Hauru no ugoku shiro	https://m.media-amazon.com/images/M/MV5BMGE4ZWIyYmItNjRiNy00OGIxLWE2NWItZWU0MThhMzViZGU5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg	2004	With her country's peace constantly under threat, Sophie, a lively but unloved milliner, catches the attention of an unexpected defender. But as the wide-eyed damsel in distress crosses paths with handsome Howl, a talented young magician with excess emotional baggage, a fit of jealousy turns the hat maker's world upside down forever. Now, stained by the indelible mark of the wicked Witch of the Waste, Sophie must move mountains to break the pitiless spell, including facing her fears and the mysterious sorcerer. However, has anyone ever set foot in Howl's impenetrable home, a walking wonder powered by a fiery heart, and lived to tell the tale?	Netflix	Howl's Moving Castle - Official Trailer | IMDb	8.2	4	0	119
59	Furiosa: A Mad Max Saga	-	https://awsimages.detik.net.id/community/media/visual/2024/05/23/furiosa-a-mad-max-saga.jpeg?w=1200	2024	The origin story of renegade warrior Furiosa before her encounter and teamup with Mad Max.	Netflix	https://www.youtube.com/watch?v=XJMuhwVlca4	7.5	8	1	148
27	Harry Potter and The Sorcerer┬Æs Stone	-	https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_.jpg	2001	An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.	Prime Video, Netflix, Google Play Movies	https://www.imdb.com/video/vi3115057433/?playlistId=tt0241527&ref_=tt_ov_vi	7.6	5	1	152
25	Frozen 2	-	https://m.media-amazon.com/images/M/MV5BMjA0YjYyZGMtN2U0Ni00YmY4LWJkZTItYTMyMjY3NGYyMTJkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_FMjpg_UX1000_.jpg	2019	Having harnessed her ever-growing power after lifting the dreadful curse of eternal winter in Frozen (2013), Queen Elsa, the grand conjurer of snow and ice, and her sister, Princess Anna, now enjoy a happy life in the peaceful kingdom of Arendelle. However, a melodious, insistent voice only Elsa can hear keeps her awake, inviting the Snow Queen to a fabled mystical forest. As a result, unable to block the thrilling call of the secret siren, Elsa follows the voice into the perpetually misty realm in the woods to find answers. But, more and more, an inexplicable imbalance hurts her kingdom and the neighboring tribe of Northuldra. Is Queen Elsa's legendary magic enough to restore peace and stability?	Netflix	https://youtu.be/bwzLiQZDw2I	8.5	1	1	103
5	Insurgent	The Divergent Series: Insurgent	https://m.media-amazon.com/images/M/MV5BMTgxOTYxMTg3OF5BMl5BanBnXkFtZTgwMDgyMzA2NDE@._V1_FMjpg_UX1000_.jpg	2015	Beatrice Prior must confront her inner demons and continue her fight against a powerful alliance which threatens to tear her society apart with the help from others on her side.	Netflix 	https://youtu.be/OBn_LRp-D7U?si=PozBNB6ftInKVdDe	6.2	1	0	119
12	Mencuri Raden Saleh	Stealing Raden Saleh	https://m.media-amazon.com/images/M/MV5BNWZmOTIzOGMtODBmMC00MjVlLThjYzUtNjcxNjg4NzY0YTg1XkEyXkFqcGdeQXVyNzEzNjU1NDg@._V1_.jpg	2022	To save his father, a master forger sets out to steal an invaluable painting with the help of a motley crew of specialists.	Netflix	https://youtu.be/DN3sRz_veBU?feature=shared	7.3	3	0	52
36	My Neighbor Totoro	Tonari no Totoro	https://m.media-amazon.com/images/M/MV5BYWM3MDE3YjEtMzIzZC00ODE5LTgxNTItNmUyMTBkM2M2NmNiXkEyXkFqcGc@._V1_QL75_UX190_CR0,0,190,281_.jpg	1988	Excited about reuniting with their ailing mother, close-knit sisters Satsuki and Mei embark on an exciting adventure when they move with their loving professor father to a new house in the verdant countryside of 1950s summer Japan. Now, nothing can stop them. And with mum in the hospital, the girls have all the time in the world to explore nature and the dense adjacent forest, the home of bashful mystical creatures only children can see. Under the clear blue sky's cloudless bliss and the bright yellow sun's promise of a luminous future, nothing can blemish the young sisters' flawless fantasy--not even life's trying times. After all, mother is getting better. Then, one radiant morning, as the shimmering green leaves of the towering camphor trees swayed in the soft morning breeze, the wide-eyed siblings stumbled upon a Totoro. But who is the enchanting visitor? Will the rotund neighbour, with his fluffy fur and mysterious eyes, be the girls' forever friend?	Netflix	My Neighbor Totoro - Official Trailer | IMDb	8.1	4	1	86
54	Pacific Rim	-	https://m.media-amazon.com/images/M/MV5BMTY3MTI5NjQ4Nl5BMl5BanBnXkFtZTcwOTU1OTU0OQ@@._V1_.jpg	2013	Long ago, legions of monstrous creatures called Kaiju arose from the sea, bringing with them all-consuming war. To fight the Kaiju, mankind developed giant robots called Jaegers, designed to be piloted by two humans locked together in a neural bridge. However, even the Jaegers are not enough to defeat the Kaiju, and humanity is on the verge of defeat. Mankind's last hope now lies with a washed-up ex-pilot, an untested trainee and an old, obsolete Jaeger.	Netflix	https://www.imdb.com/video/vi1369752345/?playlistId=tt1663662&ref_=ext_shr_lnk	6.9	1	0	131
55	Pacific Rim: Uprising	-	https://m.media-amazon.com/images/M/MV5BMjI3Nzg0MTM5NF5BMl5BanBnXkFtZTgwOTE2MTgwNTM@._V1_.jpg	2018	Jake Pentecost is a once-promising Jaeger pilot whose legendary father gave his life to secure humanity's victory against the monstrous Kaiju. Jake has since abandoned his training only to become caught up in a criminal underworld. But when an even more unstoppable threat is unleashed to tear through cities and bring the world to its knees, Jake is given one last chance by his estranged sister, Mako Mori, to live up to his father's legacy.	Netflix	https://www.imdb.com/video/vi2501425177/?playlistId=tt2557478&ref_=ext_shr_lnk	5.6	1	0	111
35	Princess Mononoke	Mononoke-hime	https://m.media-amazon.com/images/M/MV5BNzcxODMxMjY4NF5BMl5BanBnXkFtZTgwMzUzMjkxMzE@._V1_.jpg	1997	While protecting his village from rampaging boar-god/demon, a confident young warrior, Ashitaka, is stricken by a deadly curse. To save his life, he must journey to the forests of the west. Once there, he's embroiled in a fierce campaign that humans were waging on the forest. The ambitious Lady Eboshi and her loyal clan use their guns against the gods of the forest and a brave young woman, Princess Mononoke, who was raised by a wolf-god. Ashitaka sees the good in both sides and tries to stem the flood of blood. This is met by animosity by both sides as they each see him as supporting the enemy.	Netflix	Princess Mononoke - Official Trailer | IMDb	8.3	4	1	133
57	Inferno	-	https://m.media-amazon.com/images/M/MV5BMTUzNTE2NTkzMV5BMl5BanBnXkFtZTgwMDAzOTUyMDI@._V1_.jpg	2016	Famous symbologist Robert Langdon (Tom Hanks) follows a trail of clues tied to Dante, the great medieval poet. When Langdon wakes up in an Italian hospital with amnesia, he teams up with Sienna Brooks (Felicity Jones), a doctor he hopes will help him recover his memories. Together, they race across Europe and against the clock to stop a madman (Ben Foster) from unleashing a virus that could wipe out half of the world's population.	Netflix	https://www.imdb.com/video/vi396539673/?playlistId=tt3062096&ref_=ext_shr_lnk	6.2	1	1	121
9	Sherlock	-	https://posters.movieposterdb.com/10_08/2010/1475582/l_1475582_6c4d4dac.jpg	2010	The quirky spin on Conan Doyle's iconic sleuth pitches him as a "high-functioning sociopath" in modern-day London. Assisting him in his investigations: Afghanistan War vet John Watson, who's introduced to Holmes by a mutual acquaintance.	Prime Video	https://www.youtube.com/watch?v=gGqWqGOSTGQ	9.1	1	0	88
40	Kal Ho Naa Ho	-	https://posters.movieposterdb.com/12_05/2003/347304/s_347304_e7f7919b.jpg	2003	Naina's neighbor, Aman, introduces her to optimism, and makes her fall in love. But tragedy stopped him from moving forward. In fact, he encouraged his friend Rohit to seduce her.	Netflix, Prime Video, Apple TV	https://www.youtube.com/watch?v=tVMAQAsjsOU	7.9	7	0	186
34	Spirited Away	Sen to Chihiro no kamikakushi	https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg	2001	The fanciful adventures of a ten-year-old girl named Chihiro, who discovers a secret world when she and her family get lost and venture through a hillside tunnel. When her parents undergo a mysterious transformation, Chihiro must fend for herself as she encounters strange spirits, assorted creatures and a grumpy sorceress who seeks to prevent her from returning to the human world	Netflix	Spirited Away | IMDb	8.6	4	1	124
13	Stranger Things	-	https://m.media-amazon.com/images/M/MV5BMGE2ZDdlN2UtZDJiOS00MTYzLTkwOGQtYTg5ZjczNjk5MmI5XkEyXkFqcGc@._V1_.jpg	2016	In 1980s Indiana, a group of young friends witness supernatural forces and secret government exploits. As they search for answers, the children unravel a series of extraordinary mysteries.	Netflix	https://youtu.be/mnd7sFt5c3A?feature=shared	8.7	1	0	51
56	The Da Vinci Code	-	https://upload.wikimedia.org/wikipedia/id/9/9b/The_da_vinci_code.jpg	2006	A murder in Paris' Louvre Museum and cryptic clues in some of Leonardo da Vinci's most famous paintings lead to the discovery of a religious mystery. For 2,000 years a secret society closely guards information that -- should it come to light -- could rock the very foundations of Christianity.	Netflix	https://www.imdb.com/video/vi2369847833/?playlistId=tt0382625&ref_=ext_shr_lnk	6.6	1	0	149
2	The Maze Runner: Scorch Trials	-	https://m.media-amazon.com/images/M/MV5BMjE3MDU2NzQyMl5BMl5BanBnXkFtZTgwMzQxMDQ3NTE@._V1_FMjpg_UX1000_.jpg	2015	The second chapter of the epic "Maze Runner" saga. Thomas (Dylan O'Brien) and his fellow Gladers face their greatest challenge yet: searching for clues about the mysterious and powerful organization known as WCKD. Their journey takes them to the Scorch, a desolate landscape filled with unimaginable obstacles. Teaming up with resistance fighters, the Gladers take on WCKD's vastly superior forces and uncover its shocking plans for them all.┬ù20th Century Fox	Netflix 	https://youtu.be/-44_igsZtgU?si=7ufXYEqfDzdeZRy2	6.3	1	0	131
16	Toy Story 1	-	https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_QL75_UX190_CR0,1,190,281_.jpg	1995	A little boy named Andy loves to be in his room, playing with his toys, especially his doll named "Woody". But, what do the toys do when Andy is not with them, they come to life. Woody believes that his life (as a toy) is good. However, he must worry about Andy's family moving, and what Woody does not know is about Andy's birthday party. Woody does not realize that Andy's mother gave him an action figure known as Buzz Lightyear, who does not believe that he is a toy, and quickly becomes Andy's new favorite toy. Woody, who is now consumed with jealousy, tries to get rid of Buzz. Then, both Woody and Buzz are now lost. They must find a way to get back to Andy before he moves without them, but they will have to pass through a ruthless toy killer, Sid Phillips.	Disney+, Prime Video	https://www.youtube.com/watch?v=v-PjgYDrg70	8.3	1	0	81
17	Toy Story 2	-	https://m.media-amazon.com/images/M/MV5BMWM5ZDcxMTYtNTEyNS00MDRkLWI3YTItNThmMGExMWY4NDIwXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_.jpg	1999	While Andy is away at summer camp Woody has been toynapped by Al McWiggin, a greedy collector and proprietor of "Al's Toy Barn". In this all-out rescue mission, Buzz and his friends Mr. Potato Head, Slinky Dog, Rex and Hamm spring into action to rescue Woody from winding up as a museum piece. They must find a way to save him before he gets sold in Japan forever and they'll never see him again.	Disney+, Prime Video	https://www.imdb.com/video/vi2052129305/?ref_=tt_vi_i_1	7.9	1	0	92
18	Toy Story 3	-	https://m.media-amazon.com/images/M/MV5BMTgxOTY4Mjc0MF5BMl5BanBnXkFtZTcwNTA4MDQyMw@@._V1_QL75_UY281_CR5,0,190,281_.jpg	2010	Woody, Buzz and the whole gang are back. As their owner Andy prepares to depart for college, his loyal toys find themselves in daycare where untamed tots with their sticky little fingers do not play nice. So, it's all for one and one for all as they join Barbie's counterpart Ken, a thespian hedgehog named Mr. Pricklepants and a pink, strawberry-scented teddy bear called Lots-o'-Huggin' Bear to plan their great escape.	Disney+, Prime Video	https://www.imdb.com/video/vi3676898329/?playlistId=tt0435761&ref_=tt_ov_vi	8.3	1	0	103
15	The Moon	Deo mun	https://m.media-amazon.com/images/M/MV5BNzU4M2YzMzktNmJkZC00YzRmLWFkNWItZGM0YTc2NTBkNTAwXkEyXkFqcGdeQXVyMTU1MDczNjU1._V1_FMjpg_UX1000_.jpg	2023	A man is left in space due to an unfortunate accident while another man on Earth struggles to bring him back safely.	Vidio, Prime Video	https://youtu.be/gxMM6Ntv78A?feature=shared	5.9	2	1	129
10	The Butterfly Effect	-	https://posters.movieposterdb.com/12_11/2004/289879/s_289879_365cbc14.jpg	2004	Evan Treborn suffers blackouts during significant events of his life. As he grows up, he finds a way to remember these lost memories and a supernatural way to alter his life by reading his journal.	Netflix	https://www.youtube.com/watch?v=LOS5YgJkjZ0	7.6	1	1	113
37	The Boy and The Heron	Kimitachi wa dou ikiru ka	https://m.media-amazon.com/images/M/MV5BYmRiZjljYzUtNjQyNS00MGEwLTliYjMtZjdjNWUzOGI3MjVkXkEyXkFqcGc@._V1_.jpg	2023	After losing his mother during the war, young Mahito moves to his family's estate in the countryside. There, a series of mysterious events lead him to a secluded and ancient tower, home to a mischievous gray heron. When Mahito's new stepmother disappears, he follows the gray heron into the tower, and enters a fantastic world shared by the living and the dead. As he embarks on an epic journey with the heron as his guide, Mahito must uncover the secrets of this world, and the truth about himself. Featuring the voices of Christian Bale, Dave Bautista, Gemma Chan, Willem Dafoe, Karen Fukuhara, Mark Hamill, Robert Pattinson and Florence Pugh.	Apple TV	The Boy and the Heron - Official Trailer | IMDb	7.5	4	2	124
19	Toy Story 4	-	https://m.media-amazon.com/images/M/MV5BMTYzMDM4NzkxOV5BMl5BanBnXkFtZTgwNzM1Mzg2NzM@._V1_QL75_UX190_CR0,0,190,281_.jpg	2019	Woody, Buzz Lightyear and the rest of the gang embark on a road trip with Bonnie and a new toy named Forky. The adventurous journey turns into an unexpected reunion as Woody's slight detour leads him to his long-lost friend Bo Peep. As Woody and Bo discuss the old days, they soon start to realize that they're two worlds apart when it comes to what they want from life as a toy.	Disney+, Prime Video	https://www.imdb.com/video/vi1497349145/?playlistId=tt1979376&ref_=tt_pr_ov_vi	7.7	1	0	100
45	Transformers: Dark of the Moon	-	https://m.media-amazon.com/images/M/MV5BMTkwOTY0MTc1NV5BMl5BanBnXkFtZTcwMDQwNjA2NQ@@._V1_FMjpg_UY478_.jpg	2011	Autobots Bumblebee, Ratchet, Ironhide, Mirage (aka Dino), Wheeljack (aka Que) and Sideswipe led by Optimus Prime, are back in action taking on the evil Decepticons, who are eager to avenge their recent defeat. The Autobots and Decepticons become involved in a perilous space race between the United States and Russia to reach a hidden Cybertronian spacecraft on the moon and learn its secrets, and once again Sam Witwicky has to go to the aid of his robot friends. The new villain Shockwave is on the scene while the Autobots and Decepticons continue to battle it out on Earth.	Netflix	https://www.imdb.com/video/vi543989017/?playlistId=tt1399103&ref_=ext_shr_lnk	6.2	1	0	154
44	Transformers: Revenge of the Fallen	-	https://m.media-amazon.com/images/M/MV5BNjk4OTczOTk0NF5BMl5BanBnXkFtZTcwNjQ0NzMzMw@@._V1_.jpg	2009	A youth chooses manhood. The week Sam Witwicky starts college, the Decepticons make trouble in Shanghai. A presidential envoy believes it's because the Autobots are around; he wants them gone. He's wrong: the Decepticons need access to Sam's mind to see some glyphs imprinted there that will lead them to a fragile object that, when inserted in an alien machine hidden in Egypt for centuries, will give them the power to blow out the sun. Sam, his girlfriend Mikaela Banes, and Sam's parents are in danger. Optimus Prime and Bumblebee are Sam's principal protectors. If one of them goes down, what becomes of Sam?	Netflix	https://www.imdb.com/video/vi2982019609/?playlistId=tt1055369&ref_=ext_shr_lnk	6	1	0	149
47	Transformers: The Last Knight	-	https://m.media-amazon.com/images/M/MV5BYWNlNjU3ZTItYTY3Mi00YTU1LTk4NjQtYjQ3MjFiNjcyODliXkEyXkFqcGc@._V1_.jpg	2017	Having left Earth, Optimus Prime finds his dead home planet, Cybertron, and discovers that he was in fact responsible for its destruction. Optimus learns that he can bring Cybertron back to life, but in order to do so, he will need an artifact that is hidden on Earth.	Netflix	https://www.imdb.com/video/vi4102142233/?playlistId=tt3371366&ref_=ext_shr_lnk	5.2	1	0	154
11	Twenty Five Twenty One	Seumuldaseot Seumulhana	https://m.media-amazon.com/images/M/MV5BNWYzODM2NGEtOWUyZi00MmEyLWFmYmItZDI3NDYzMGI0NWI2XkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg	2022	In a time when dreams seem out of reach, a teen fencer pursues big ambitions and meets a hardworking young man who seeks to rebuild his life. At 22 and 18, they say each other's names for the first time, at 25 and 21, they fall in love.	Netflix	https://youtu.be/n7F8o-SoK8s?feature=shared	8.6	2	1	70
46	Transformers: Age of Extinction	-	https://m.media-amazon.com/images/M/MV5BMjEwNTg1MTA5Nl5BMl5BanBnXkFtZTgwOTg2OTM4MTE@._V1_FMjpg_UY749_.jpg	2014	After the battle between the Autobots and Decepticons that leveled Chicago, humanity thinks that all alien robots are a threat. So Harold Attinger, a CIA agent, establishes a unit whose sole purpose is to hunt down all of them. But it turns out that they are aided by another alien robot who is searching for Optimus Prime. Cade Yeager, a "robotics expert", buys an old truck and upon examining it, he thinks it's a Transformer. When he powers it up, he discovers it's Optimus Prime. Later, men from the unit show up looking for Optimus. He helps Yeager and his daughter Tessa escape but are pursued by the hunter. They escape and Yeager learns from technology he took from the men that a technology magnate and defense contractor named Joshua Joyce is part of what's going on, so they go to find out what's going on.	Netflix	https://www.imdb.com/video/vi3138759961/?playlistId=tt2109248&ref_=ext_shr_lnk	5.6	1	1	165
20	UP	-	https://m.media-amazon.com/images/M/MV5BYjBkM2RjMzItM2M3Ni00N2NjLWE3NzMtMGY4MzE4MDAzMTRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_FMjpg_UX1000_.jpg	2009	As a boy, Carl Fredricksen wanted to explore South America and find the forbidden Paradise Falls. About 64 years later he gets to begin his journey along with Boy Scout Russell by lifting his house with thousands of balloons. On their journey, they make many new friends including a talking dog, and figure out that someone has evil plans. Carl soon realizes that this evildoer is his childhood idol.	Disney+, Prime Video	https://www.youtube.com/watch?v=ORFWdXl_zJ4	8.3	1	1	96
28	Harry Potter and The Chamber of Secrets	-	https://m.media-amazon.com/images/M/MV5BMjE0YjUzNDUtMjc5OS00MTU3LTgxMmUtODhkOThkMzdjNWI4XkEyXkFqcGdeQXVyMTA3MzQ4MTc0._V1_.jpg	2002	Harry Potter lives his second year at Hogwarts with Ron and Hermione when a message on the wall announces that the legendary Chamber of Secrets has been opened. The trio soon realize that, to save the school, it will take a lot of courage.	Prime Video, Netflix, Google Play Movies	https://www.imdb.com/video/vi1705771289/?playlistId=tt0295297&ref_=tt_ov_vi	7.4	5	1	161
48	Transformers: Rise of the Beasts	-	https://m.media-amazon.com/images/M/MV5BZTVkZWY5MmItYjY3OS00OWY3LTg2NWEtOWE1NmQ4NGMwZGNlXkEyXkFqcGc@._V1_FMjpg_UY711_.jpg	2023	Returning to the action and spectacle that has captivated moviegoers around the world, Transformers: Rise of the Beasts will take audiences on a global '90s adventure with the Autobots and introduce a new faction of Transformers - the Maximals - to join them as allies in the war. the ongoing battle on earth. Directed by Steven Caple Jr. and starring Anthony Ramos and Dominique Fishback	Netflix	https://www.imdb.com/video/vi4232692761/?playlistId=tt5090568&ref_=ext_shr_lnk	6	1	1	127
\.


--
-- Data for Name: Genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Genre" (id, name, description) FROM stdin;
1	Globerotting Adventure	\N
2	Drama	\N
3	Dark Comedy	\N
4	Crime	\N
5	Advanture	\N
7	History	\N
8	Mystery	\N
9	Romance	\N
10	Comedy	\N
11	Dark Fantasy	\N
12	Cyberpunk	\N
13	Heist	\N
14	Survival	\N
15	Mistery	\N
16	Action	\N
17	Sport	\N
18	Super-natural	\N
19	Adventure	\N
20	Fantasy	\N
21	Boxing	\N
22	Sci-fi	\N
23	Musical	\N
24	Animation	\N
25	Horror	\N
26	Family	\N
27	Sci-Fi	\N
28	Kaiju	\N
29	Superhero	\N
30	Coming of Age	\N
31	Anime	\N
32	Suspense Mystery	\N
33	Thriller	\N
6	Fantasy	\N
\.


--
-- Data for Name: PasswordResetToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PasswordResetToken" (id, email, token, "createdAt", "userId", expiration) FROM stdin;
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Review" (id, "userName", rating, comment, date, "dramaId", "userId") FROM stdin;
1	frz xyz	5	Nice	2024-10-13 16:41:08.805	24	4
2	frz xyz	5	Nice	2024-10-13 16:41:08.815	24	4
3	frz xyz	5	Cool	2024-10-13 16:43:43.877	24	4
4	frz xyz	4	Nice	2024-10-13 17:20:44.433	24	4
5	farrel	3	nice	2024-10-13 17:41:05.713	42	1
6	Farrel R	4	Keren	2024-10-13 17:48:28.023	42	6
7	frz xyz	2	c	2024-10-20 09:50:01.016	42	4
8	Farrel Rahandika	4	Keren	2024-11-24 07:53:31.192	41	2
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Role" (id, name) FROM stdin;
1	admin
2	writer
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (email, password, "roleId", "createdAt", username, id, "isSuspended") FROM stdin;
farrelrahandika@gmail.com	\N	2	2024-10-13 10:37:59.675	Farrel Rahandika	2	f
farrel.rahandika.tif422@polban.ac.id	\N	2	2024-10-13 15:59:47.637	3A_010_FARREL	3	f
frzxyzx@gmail.com	\N	2	2024-10-13 16:40:57.567	frz xyz	4	f
farrelrahandika2@gmail.com	$2a$10$tCg2h6Jakr/Uvf4G.dpa4etbKJYedNI8MnSqItSumAlzUJ1nsnGMG	2	2024-10-13 17:47:56.338	Farrel R	6	f
frzxyz@gmail.com	$2a$10$VtEFn2qYTet4h1oAYVpPveX09PBNIewKSfXv7TUEwHMbAOYMRdq.G	1	2024-10-13 09:41:08.734	farrel	1	f
\.


--
-- Data for Name: _ActorToDrama; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_ActorToDrama" ("A", "B") FROM stdin;
168	1
67	1
153	1
85	1
65	1
148	1
116	1
168	2
67	2
153	2
65	2
60	2
193	2
58	2
168	3
67	3
153	3
65	3
60	3
193	3
58	3
85	3
42	4
120	4
123	4
128	4
194	4
287	4
42	5
120	5
215	5
128	5
12	5
245	6
219	6
315	6
262	6
98	6
146	6
246	6
40	6
21	6
113	7
95	7
141	7
92	7
229	7
234	7
199	7
171	7
25	7
8	8
115	8
155	8
106	8
121	8
265	8
291	8
236	8
197	8
225	9
281	9
282	9
101	9
253	9
180	9
56	9
293	9
205	9
72	10
11	10
110	10
295	10
132	10
270	10
222	10
43	10
135	10
97	11
269	11
4	11
118	11
188	11
26	11
129	11
279	11
309	11
131	12
64	12
274	12
32	12
189	12
255	12
54	12
145	12
208	12
192	13
82	13
290	13
311	13
33	13
304	13
34	13
7	13
217	13
22	14
19	14
230	14
172	14
252	14
163	14
251	14
18	14
13	14
81	15
100	15
28	15
283	15
79	15
134	15
142	15
29	15
303	15
196	16
184	16
299	16
31	16
51	16
207	16
179	16
240	16
66	16
196	17
184	17
51	17
207	17
179	17
240	17
66	17
41	17
214	17
196	18
184	18
299	18
51	18
179	18
240	18
66	18
41	18
198	18
196	19
184	19
299	19
179	19
240	19
210	19
16	19
99	19
307	19
256	20
277	20
240	20
285	20
244	20
86	20
227	20
221	20
61	20
127	21
170	21
147	21
149	21
75	21
167	21
140	21
112	21
17	21
14	21
156	21
238	21
240	21
93	21
159	21
114	21
74	21
239	21
127	22
149	22
202	22
182	22
190	22
52	22
111	22
276	22
161	22
62	22
170	22
59	22
162	22
9	22
305	22
167	22
302	22
44	22
167	23
127	23
149	23
177	23
1	23
47	23
124	23
35	24
242	24
10	24
80	24
258	24
35	25
242	25
10	25
80	25
165	26
191	26
107	26
83	26
224	26
266	26
70	26
39	26
137	26
268	27
73	27
312	27
237	27
213	27
169	27
201	27
249	27
27	27
268	28
73	28
312	28
237	28
213	28
169	28
201	28
249	28
27	28
158	29
38	29
173	29
164	29
76	29
158	30
38	30
173	30
164	30
76	30
158	31
38	31
173	31
164	31
76	31
298	32
260	32
185	32
90	32
150	32
151	32
284	32
125	32
257	33
250	33
233	33
154	33
71	33
103	33
68	33
23	33
271	33
273	34
178	34
15	34
91	35
133	35
94	35
49	36
37	36
36	36
139	37
297	37
30	37
166	38
3	38
55	38
2	38
223	39
203	39
235	39
69	39
77	39
211	40
275	40
130	40
308	40
275	41
117	41
220	41
280	41
136	41
275	42
232	42
203	42
294	43
220	43
50	43
87	44
296	44
174	44
254	44
52	44
48	44
187	44
160	44
87	45
216	45
174	45
254	45
52	45
152	45
241	46
63	46
46	46
175	46
31	46
248	46
241	47
226	47
254	47
96	47
195	47
5	47
218	48
313	48
272	48
20	48
102	48
231	48
292	49
267	49
84	49
105	49
301	49
89	49
176	49
247	49
292	50
267	50
84	50
105	50
301	50
89	50
176	50
247	50
2	50
292	51
267	51
84	51
105	51
301	51
89	51
176	51
247	51
2	51
292	52
267	52
84	52
105	52
301	52
89	52
176	52
247	52
2	52
292	53
267	53
84	53
105	53
301	53
89	53
176	53
247	53
2	53
138	54
157	54
306	54
122	54
119	54
78	54
144	54
314	55
228	55
206	55
78	55
122	55
68	55
108	55
109	55
196	56
143	56
286	56
259	56
88	56
186	56
196	57
200	57
53	57
288	57
263	57
181	57
126	57
264	58
316	58
243	58
289	58
109	58
24	59
300	59
104	59
183	59
57	60
310	60
212	60
261	60
209	61
204	61
6	61
45	61
278	61
\.


--
-- Data for Name: _DramaToGenre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_DramaToGenre" ("A", "B") FROM stdin;
1	16
1	8
1	27
1	33
2	16
2	19
2	27
2	33
3	16
3	19
3	27
3	33
4	16
4	19
4	8
4	27
5	16
5	19
5	27
5	33
6	16
6	3
6	29
6	27
7	2
7	8
7	33
8	10
8	2
8	9
9	4
9	2
9	8
9	33
10	2
10	27
10	33
11	9
11	2
11	30
11	10
12	16
12	2
12	13
12	4
12	10
13	27
13	11
13	25
13	8
13	2
14	14
14	16
14	27
14	8
14	33
15	27
15	2
15	19
15	16
16	24
16	19
16	10
16	26
16	6
17	24
17	19
17	10
17	26
17	6
18	24
18	19
18	10
18	26
18	6
19	24
19	19
19	10
19	26
19	6
20	24
20	19
20	10
20	26
20	6
21	24
21	19
21	10
21	26
21	17
22	24
22	19
22	10
22	26
22	17
23	24
23	19
23	10
23	26
23	17
24	24
24	19
24	10
24	26
24	20
24	23
25	24
25	19
25	10
25	26
25	20
25	23
26	12
26	16
26	2
26	15
27	19
27	26
27	20
28	19
28	26
28	20
28	8
29	31
29	16
29	19
29	2
29	20
30	31
30	16
30	19
30	2
30	20
31	31
31	16
31	19
31	2
31	20
32	21
32	16
32	2
32	27
32	17
33	16
33	19
33	24
33	20
33	26
34	31
34	20
34	19
34	18
34	2
35	31
35	20
35	19
35	16
35	2
35	9
36	31
36	20
36	19
36	26
36	18
37	31
37	20
37	19
37	18
38	31
38	20
38	19
38	18
38	2
38	9
39	9
39	23
40	9
40	23
40	10
41	2
41	23
41	26
42	9
42	2
43	5
43	2
43	26
44	16
44	19
44	27
45	16
45	19
45	27
46	16
46	19
46	27
47	16
47	19
47	27
48	16
48	19
48	27
49	16
49	19
49	4
49	8
49	24
50	16
50	19
50	4
50	8
50	24
51	16
51	19
51	4
51	8
51	24
52	16
52	19
52	4
52	8
52	24
53	16
53	19
53	4
53	8
53	24
54	28
54	16
54	19
54	22
55	28
55	16
55	19
55	22
56	1
56	32
56	8
56	33
57	16
57	19
57	4
57	2
57	8
58	16
58	33
59	16
59	19
59	27
59	33
60	2
60	7
61	2
61	7
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
54b79bd3-4224-4583-bdf2-7633ccd9be37	88ff1887dfa3529b5eb705648a84e9856eb8577bff5470d2eb7df4fe60be93b4	2024-12-01 02:26:38.429346+07	20241013225047_add_expiration_field	\N	\N	2024-12-01 02:26:38.428191+07	1
a08efc2b-eb82-494b-b38a-6adaf663c56e	a7703539b0817cf3caa4c26bb29c18213125e1d05ecc4283ac7c5c821e7a5012	2024-09-14 20:02:43.142212+07	20240909031012_init	\N	\N	2024-09-14 20:02:43.105802+07	1
323fc185-bdf7-427a-944f-bf2914aa6774	99cacfe73ac0adf09fe557b0174a21d9955249db13054ed91d5252212b5076e2	2024-09-14 20:02:43.155006+07	20240909051101_init	\N	\N	2024-09-14 20:02:43.142498+07	1
3a357d78-4ea2-4505-97fd-58ba43b1a27d	7a9bf3732af8c8490e98dd6ca1121bf61d76a87484ddae77bc9aede0fab0f655	2024-09-14 20:02:43.15703+07	20240909052327_init	\N	\N	2024-09-14 20:02:43.155498+07	1
30a4f702-27d3-4eff-b8b8-9164685c4cac	b3219c71000e20cbf4a13164d6cb2baa5a83856baf6b36936ec606690a74b88b	2024-12-01 02:26:38.432864+07	20241013235612_add_unique_to_token	\N	\N	2024-12-01 02:26:38.42961+07	1
676c6b56-2445-4704-b95b-cef865a11e5f	9a1ee071f9f8a42891a9483b1e960bdc85f08d1600888b31890627eaaee6189a	2024-09-14 20:02:43.158377+07	20240909052847_init	\N	\N	2024-09-14 20:02:43.157447+07	1
f060ca2f-106f-4bba-8c66-01d3a3e56c1b	aed3c78b5859bc4a0724b71d5ff398a0851002f6cd754f66d39f2fb947b7b39c	2024-09-14 20:02:43.81344+07	20240914130243_init	\N	\N	2024-09-14 20:02:43.811074+07	1
a7f22a56-d85f-467d-a988-9c0075ec8aa6	aa9f317a57de59cf27e37de323078baf287863cd88652abafd0c1336ff7619ea	2024-09-14 20:35:03.207456+07	20240914133503_init	\N	\N	2024-09-14 20:35:03.206022+07	1
27258fa2-792d-4bba-91ea-e8e4ba76f6ab	095afafb87b79117c5a0ed8b9f4bbab85469ff0d65176fbbf74ad3e81bbf796e	2024-12-01 02:26:38.434441+07	20241102200825_add_is_suspended	\N	\N	2024-12-01 02:26:38.433259+07	1
85cd483f-3687-4da0-8799-abe8e139d061	7bdcbcf43e37272d91b4a336bb845f62b8b385b332dcd91ab2a5c67f632b8e9e	2024-10-13 11:35:33.012811+07	20240930033943_add_description_to_genre	\N	\N	2024-10-13 11:35:33.010578+07	1
e12f4959-8ded-46ee-b01c-4e7bda8aeaa4	e0c9b6d211cc1f746ee0da47cd8cb6c7d1a1812908ee51d116faf8571eb293d3	2024-10-13 11:35:33.037465+07	20240930034518_add_table_user_and_role	\N	\N	2024-10-13 11:35:33.01306+07	1
818e316c-5e63-43ad-b0c6-274dcd5427f9	02c4aefee0028df27ce2c78fcb6532c52680d38d5a545c1c437921edc73c0190	2024-10-13 11:35:33.042155+07	20241005223835_update_table_user	\N	\N	2024-10-13 11:35:33.037785+07	1
404a15ee-d8fb-4346-b14a-065b29a71682	d2caa214542f60e59853b7f33b235ef1d224b4d13e90a4bf265b2f33bca7b718	2024-10-13 11:35:33.043258+07	20241012010507_add_optional_password	\N	\N	2024-10-13 11:35:33.042393+07	1
af73c7f2-2835-485a-8917-742112e66cf3	0b646554be06a1d0bbfbd5de1de5500ee745b86afde69869f5eaefaf9fe9f7df	2024-10-13 22:49:39.834805+07	20241013154939_change_userid_to_string	\N	\N	2024-10-13 22:49:39.045712+07	1
aebea8a5-cc03-4807-8838-9583b9f03129	7843fa4c85d9063bf97535f016ef3d717ce606f0c1e0d5412c801c6af7a5ebd0	2024-10-13 23:35:10.806391+07	20241013163510_user_id_autoincrement	\N	\N	2024-10-13 23:35:10.787893+07	1
f596d235-5231-47ba-9953-c35c0cfa62cb	68966de336364e75467c6553ab38e9b813b5bffd81faa52a49d7527bcec3a184	2024-12-01 02:26:38.427865+07	20241013224225_add_password_reset_token	\N	\N	2024-12-01 02:26:38.416475+07	1
\.


--
-- Name: Actor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Actor_id_seq"', 316, true);


--
-- Name: Award_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Award_id_seq"', 1, false);


--
-- Name: Country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Country_id_seq"', 10, true);


--
-- Name: Drama_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Drama_id_seq"', 61, true);


--
-- Name: Genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Genre_id_seq"', 33, true);


--
-- Name: PasswordResetToken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PasswordResetToken_id_seq"', 1, false);


--
-- Name: Review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Review_id_seq"', 8, true);


--
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Role_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 6, true);


--
-- Name: Actor Actor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Actor"
    ADD CONSTRAINT "Actor_pkey" PRIMARY KEY (id);


--
-- Name: Award Award_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Award"
    ADD CONSTRAINT "Award_pkey" PRIMARY KEY (id);


--
-- Name: Country Country_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Country"
    ADD CONSTRAINT "Country_pkey" PRIMARY KEY (id);


--
-- Name: Drama Drama_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Drama"
    ADD CONSTRAINT "Drama_pkey" PRIMARY KEY (id);


--
-- Name: Genre Genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Genre"
    ADD CONSTRAINT "Genre_pkey" PRIMARY KEY (id);


--
-- Name: PasswordResetToken PasswordResetToken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PasswordResetToken"
    ADD CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: PasswordResetToken_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON public."PasswordResetToken" USING btree (token);


--
-- Name: Role_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Role_name_key" ON public."Role" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: _ActorToDrama_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_ActorToDrama_AB_unique" ON public."_ActorToDrama" USING btree ("A", "B");


--
-- Name: _ActorToDrama_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_ActorToDrama_B_index" ON public."_ActorToDrama" USING btree ("B");


--
-- Name: _DramaToGenre_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_DramaToGenre_AB_unique" ON public."_DramaToGenre" USING btree ("A", "B");


--
-- Name: _DramaToGenre_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_DramaToGenre_B_index" ON public."_DramaToGenre" USING btree ("B");


--
-- Name: Actor Actor_countryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Actor"
    ADD CONSTRAINT "Actor_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public."Country"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Award Award_countryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Award"
    ADD CONSTRAINT "Award_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public."Country"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Award Award_dramaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Award"
    ADD CONSTRAINT "Award_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES public."Drama"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Drama Drama_countryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Drama"
    ADD CONSTRAINT "Drama_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public."Country"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_dramaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES public."Drama"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _ActorToDrama _ActorToDrama_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ActorToDrama"
    ADD CONSTRAINT "_ActorToDrama_A_fkey" FOREIGN KEY ("A") REFERENCES public."Actor"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ActorToDrama _ActorToDrama_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ActorToDrama"
    ADD CONSTRAINT "_ActorToDrama_B_fkey" FOREIGN KEY ("B") REFERENCES public."Drama"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _DramaToGenre _DramaToGenre_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_DramaToGenre"
    ADD CONSTRAINT "_DramaToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES public."Drama"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _DramaToGenre _DramaToGenre_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_DramaToGenre"
    ADD CONSTRAINT "_DramaToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES public."Genre"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

