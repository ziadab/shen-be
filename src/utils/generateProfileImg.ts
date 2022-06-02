const generateProfileImg = (): string => {
  const img = Math.floor(Math.random() * (8 - 1 + 1) + 1);
  return `https://creative-insults.herokuapp.com/images/${img}`;
};

export default generateProfileImg;
