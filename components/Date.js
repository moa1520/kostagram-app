export default createdAt => {
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDay = now.getDate();
  const nowHour = now.getHours();
  const nowMin = now.getMinutes();
  const newDate = new Date(nowYear, nowMonth, nowDay, nowHour, nowMin);

  const year = Number(createdAt.substring(0, 4));
  const month = Number(createdAt.substring(5, 7));
  const day = Number(createdAt.substring(8, 10));
  const hour = Number(createdAt.substring(11, 13));
  const min = Number(createdAt.substring(14, 16));
  const postDate = new Date(year, month, day, hour, min);

  const subDate = newDate - postDate - 32400000;

  if (Math.ceil(subDate / (1000 * 60)) < 1) {
    return "방금 전";
  } else if (Math.ceil(subDate / (1000 * 60 * 60)) === 1) {
    return `${Math.ceil(subDate / (1000 * 60))}분 전`;
  } else if (Math.ceil(subDate / (1000 * 60 * 60 * 24)) === 1) {
    return `${Math.ceil(subDate / (1000 * 60 * 60))}시간 전`;
  } else if (Math.ceil(subDate / (1000 * 60 * 60 * 24 * 30)) === 1) {
    return `${Math.ceil(subDate / (1000 * 60 * 60 * 24))}일 전`;
  } else {
    return `${Math.ceil(subDate / (1000 * 60 * 60 * 24 * 30))}달 전`;
  }
};
