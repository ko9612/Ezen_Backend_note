const { Product } = require("../models");
/*
Product.create() : 삽입
Product.findAll() : 전체 조회 / findByPk() : pk로 조회 / findOne() : 조회(하나만)
Product.update() : 수정
Product.destroy() : 삭제
=> 모든 메서드는 Promise 기반이므로 async/await 사용 가능
*/

exports.createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    console.log("newProduct: ", newProduct);
    const prod = await Product.create(newProduct);
    console.log("prod: ", prod);
    res.json(prod);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET / api/products?order=idDESC(?order=priceASC)
exports.listProduct = async (req, res) => {
  try {
    const orderMap = {
      idDESC: ["id", "DESC"],
      priceASC: ["price", "ASC"],
      priceDESC: ["price", "DESC"],
    };
    const rawOrder = req.query.order;
    const order = orderMap[rawOrder] || ["id", "DESC"];
    const { count, rows } = await Product.findAndCountAll({
      attribute: ["id", "name", "price", "image_url", "spec"], // 컬럼명 기술
      order: [order],
      // order: [["id", "DESC"]],
      // limit: 5,
      // offset: 0,
    });
    const prodList = {
      products: rows,
      totalCount: count,
    };
    res.status(200).json(prodList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 스펙별 상품 가져오기(hit, best 상품 가져오기)
// get /api/products/spec?spec=best
exports.getProductBySpec = async (req, res) => {
  const spec = req.query.spec || "normal";
  try {
    const products = await Product.findAll({
      attribute: ["id", "name", "price", "image_url", "spec"],
      where: { spec },
      order: [["id", "DESC"]],
      limit: 4,
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("스펙별 상품 조회 에러: ", error);
    res.status(500).json({ message: "서버 오류" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "잘못된 요청입니다." });
    const prod = await Product.findByPk(id);
    if (!prod)
      return res.status(404).json({ message: "존재하지 않는 상품입니다." });
    res.status(200).json(prod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.destroy({ where: { id } });
    if (result === 0)
      return res.json({ result: "fail", message: "해당 상품이 없습니다." });
    res.json({
      result: "success",
      message: `${id}번 상품정보를 삭제했습니다.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // 수정할 상품번호
    const product = req.body; // 수정한 상품정보

    const [result] = await Product.update(product, { where: { id } });
    if (result === 0)
      return res.json({ result: "fail", message: "해당 상품이 없습니다." });
    res.json({
      result: "success",
      message: `${id}번 상품정보를 수정했습니다.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
