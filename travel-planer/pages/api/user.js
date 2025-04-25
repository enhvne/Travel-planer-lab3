// pages/api/user.js
export default function handler(req, res) {
    const user = {
      id: 1,
      name: 'Бат',
      age: 25,
      email: 'bat@example.com'
    };

    res.status(200).json(user);
}
  