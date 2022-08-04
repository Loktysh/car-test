const getCoinData = async (id: string) => {
  try {
    const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return { message: 'Not found' };
  }
};
const getCoinsList = async (page = 0) => {
  try {
    const response = await fetch(`https://api.coincap.io/v2/assets/?offset=${page * 10}&limit=10`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return { message: 'Not found' };
  }
};

const getCoinHistory = async (id: string) => {
  try {
    const response = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return { message: 'Not found' };
  }
};

export { getCoinsList, getCoinData, getCoinHistory };
