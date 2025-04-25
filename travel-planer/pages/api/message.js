// pages/api/message.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      const { name } = req.body;
      res.status(200).json({ message: `Сайн уу, ${name}!` });
    } else {
      res.status(405).json({ error: 'Зөвхөн POST зөвшөөрөгдөнө' });
    }
  }
  