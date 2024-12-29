export const truncateText = (text, charLimit) => {
    if (text.length <= charLimit) return text;
    return text.slice(0, charLimit) + '...';
  };