import express from "express";
import cors from "cors";
import UUID from "uuidjs";
import bodyParser from "body-parser";
import moment from "moment";
import { PrismaClient } from "@prisma/client";

const days = ["日", "月", "火", "水", "木", "金", "土"];

const getDateStr = (targetDate: Date) => {
  var year = targetDate.getFullYear();
  var month = ("00" + (targetDate.getMonth() + 1)).slice(-2);
  var day = ("00" + targetDate.getDate()).slice(-2);
  var result =
    year + "年" + month + "月" + day + "日(" + days[targetDate.getDay()] + ")";
  return result;
};

const getTargetDate = (minusDate: number): Date => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - minusDate);
  return targetDate;
};

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("hello express\n");
});

app.get("/cards/activities", async (req, res) => {
  const startDate = getTargetDate(5);
  const cards = await prisma.card.findMany({
    where: {
      post_date: {
        gt: startDate,
      },
    },
  });
  const activities = [];
  for (let i = 0; i < 5; i++) {
    const date = getTargetDate(i);
    const totalCount = cards.filter((c) => {
      const isYearSame = c.post_date?.getFullYear() == date.getFullYear();
      const isMonthSame = c.post_date?.getMonth() == date.getMonth();
      const isDateSame = c.post_date?.getDate() == date.getDate();
      return isYearSame && isMonthSame && isDateSame;
    }).length;
    const dateStr = getDateStr(date);
    activities.push({
      date: dateStr,
      totalCount: totalCount,
    });
  }
  res.json({ activities });
});

app.get("/cards/total-count", async (req, res) => {
  const totalCount = await prisma.card.count();
  res.json({ totalCount });
});

app.get("/genres", async (req, res) => {
  const genres = await prisma.genre.findMany();
  res.json({ genres });
});

app.get("/recent-posts", async (req, res) => {
  const cards = await prisma.card.findMany({
    // JOIN
    include: {
      genre: true,
    },
    // SORT
    orderBy: [
      {
        post_date: "desc",
      },
    ],
    // LIMIT
    take: 5,
  });
  res.json({ cards });
});

const addKeywordCondition = (keyword: string) => {
  if (!keyword) return {};
  return {
    OR: [
      {
        title: {
          contains: keyword,
        },
      },
      { content: { contains: keyword } },
    ],
  };
};

const addGenreIdCondition = (genreId: string) => {
  if (!genreId) return {};
  return {
    genre_id: { equals: genreId },
  };
};

const convertStrToDate = (str: string) => {
  return moment(str).toDate();
};

const addFromDateCondtion = (fromDate: string) => {
  if (!fromDate) return {};
  return {
    post_date: {
      gt: convertStrToDate(fromDate),
    },
  };
};

const addToDateCondtion = (toDate: string) => {
  if (!toDate) return {};
  return {
    post_date: {
      lt: convertStrToDate(toDate),
    },
  };
};

app.get("/cards", async (req, res) => {
  const keyword = req.query.keyword as string;
  const genreId = req.query.genreId as string;
  const fromDate = req.query.fromDate as string;
  const toDate = req.query.toDate as string;
  const cards = await prisma.card.findMany({
    // JOIN
    include: {
      genre: true,
    },
    // SORT
    orderBy: [
      {
        post_date: "desc",
      },
    ],
    // WHERE
    where: {
      AND: [
        // keyword
        addKeywordCondition(keyword),
        // genreId
        addGenreIdCondition(genreId),
        // fromDate
        addFromDateCondtion(fromDate),
        // toDate
        addToDateCondtion(toDate),
      ],
    },
  });
  res.json({ cards });
});

// 両方指定されていたら、AND と ORの組み合わせやな

app.post("/cards", async (req, res) => {
  // create genre if not exist
  let targetGenre;
  if (req.body.genreId) {
    targetGenre = await prisma.genre.findUnique({
      where: {
        id: req.body.genreId,
      },
    });
  } else {
    const genreId = UUID.generate().substring(0, 22);
    targetGenre = await prisma.genre.create({
      data: {
        id: genreId,
        name: req.body.genreName,
      },
    });
  }
  // create card
  const cardId = UUID.generate().substring(0, 22);
  const card = await prisma.card.create({
    data: {
      id: cardId,
      title: req.body.title,
      content: req.body.content,
      genre_id: req.body.genreId || targetGenre?.id,
      post_date: new Date(),
    },
  });
  res.json({ card });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`REST API server ready at: http://localhost:${PORT}`);
});
