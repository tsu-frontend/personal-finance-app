function validateInput4(value, type, data) {
  switch (true) {
    case !value:
      return "This field is required";
      case !/^[1-9]\d*(\.\d+)?$/.test(value):
      return "Field must be numeric";
    case type === "withdraw" && value > data.total:
      return "Exceeds pot total";
    case type === "add" && value > data.target - data.total:
      return "Exceeds pot target";
  }

  // null = no errors
  return null;
}

export { validateInput4 };
