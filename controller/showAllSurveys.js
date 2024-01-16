const { Survey, Answer, Question } = require('../models');

const showAllSurveys = async (req, res) => {
  try {
    // Request로부터 Parameter 값들 가져오기
    const userId = req.params.id;
    const pageLimit = req.query.limit;
    const pageOffset = (req.query.page - 1) * pageLimit;

    const totalSurveys = await Survey.count({
      where: { open: true },
    });

    const totalPages = Math.ceil(totalSurveys / pageLimit);

    // limit, offset으로 각 페이지마다 보여질 survey를 가져와 array로 만들기
    const surveys = await Survey.findAll({
      where: { open: true },
      attributes: [
        'id',
        'title',
        'open',
        'mainImageUrl',
        'createdAt',
        'updatedAt',
        'deadline',
      ],
      limit: pageLimit,
      offset: pageOffset,
    });

    if (!surveys.length) {
      return res.status(404).json({ message: '작성된 설문지가 없습니다.' });
    }

    const result = [];
    for (const survey of surveys) {
      const answer = await Answer.findOne({
        where: { userId: userId },
        include: [
          {
            model: Question,
            where: { surveyId: survey.id },
          },
        ],
      });

      const userCount = await Answer.count({
        distinct: true,
        col: 'userId',
        include: [
          {
            model: Question,
            where: { surveyId: survey.id },
          },
        ],
      });

      result.push({
        surveyId: survey.id,
        title: survey.title,
        open: survey.open,
        mainImageUrl: survey.mainImageUrl,
        createdAt: survey.createdAt,
        updatedAt: survey.updatedAt,
        deadline: survey.deadline,
        isAttended: !!answer,
        attendCount: userCount,
      });
    }

    res.json({ surveys: result, totalPages: totalPages });
  } catch (error) {
    res.status(500).json({ message: '데이터를 불러오는데 실패했습니다.' });
  }
};

module.exports = { showAllSurveys };
