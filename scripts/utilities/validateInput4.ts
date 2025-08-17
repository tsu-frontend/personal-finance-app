class ValidateInput4 {
  static validate(value: string, type: "withdraw" | "add", data: { total: number; target: number }): string | null {
    switch (true) {
      case !value:
        return "This field is required";
      case !/^[1-9]\d*(\.\d+)?$/.test(value):
        return "Field must be numeric";
      case type === "withdraw" && Number(value) > data.total:
        return "Exceeds pot total";
      case type === "add" && Number(value) > data.target - data.total:
        return "Exceeds pot target";
    }
    return null;
  }
}

export { ValidateInput4 };
