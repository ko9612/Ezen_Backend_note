const area = {
  square: function (len) {
    // 정사각형 면적
    return len * len;
  },
  circle: function (radius) {
    // 원의 면적
    return Math.PI * radius * radius;
  },
  triangle: function (w, h) {
    // 직감삭형 면적
    return (w * h) / 2;
  },
};

module.exports = area;
