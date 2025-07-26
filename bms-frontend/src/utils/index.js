export const formatReleaseDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.toLocaleString("en-IN", { day: "2-digit" });
  const month = date.toLocaleString("en-IN", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

export const formatedTodayDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const yyyy = today.getFullYear();
  const formattedDate = `${dd}-${mm}-${yyyy}`;
  return formattedDate;
};

export const seatTypePrices = {
  PREMIUM: 510,
  EXECUTIVE: 290,
  NORMAL: 180,
};

export const getSeatType = (seatId) => {
  const row = seatId?.charAt(0);
  if (row === "E") return "PREMIUM";
  if (["B", "C", "D"].includes(row)) return "EXECUTIVE";
  if (row === "A") return "NORMAL";
  return "UNKNOWN";
};

export const groupSeatsByType = (seats) => {
  const grouped = {};

  seats.forEach((seatId) => {
    const type = getSeatType(seatId);
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(seatId);
  });

  return Object.entries(grouped).map(([type, seats]) => ({ type, seats }));
};

export const calculateTotalPrice = (seats) => {
  const base = seats.reduce((acc, seatId) => {
    const type = getSeatType(seatId);
    const price = seatTypePrices[type] || 0;
    return acc + price;
  }, 0);
  const tax = +(base * 0.05).toFixed(2); // 5% tax
  const total = +(base + tax).toFixed(2);
  return { base, tax, total };
};
