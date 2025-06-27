// product 모델 정의
module.exports = (sequelize, DataTypes) => {
  const newProduct = sequelize.define(
    // product 모델 정의
    "Product",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, // 자동 증가
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      image_url: DataTypes.STRING(255),
      spec: {
        type: DataTypes.ENUM("hit", "best", "new", "normal"),
        defaultValue: "normal",
      },
      create_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "products",
      timestamp: true, // createAt, updateAt 자동 생성
      underscored: true, // create_at, updated_at로 생성
    }
  ); // define()
  return newProduct;
};
