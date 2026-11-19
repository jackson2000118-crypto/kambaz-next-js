import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const rawA = searchParams.get("a");
  const rawB = searchParams.get("b");
  // Reject blank values, partial numbers such as "10abc", and Infinity.
  if (
    rawA === null ||
    rawB === null ||
    rawA.trim() === "" ||
    rawB.trim() === ""
  ) {
    return Response.json({ error: "Invalid numbers" }, { status: 400 });
  }
  const a = Number(rawA);
  const b = Number(rawB);
  const operation = searchParams.get("operation");
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return Response.json({ error: "Invalid numbers" }, { status: 400 });
  }
  let result: number;
  switch (operation) {
    case "add":
      result = a + b;
      break;
    case "subtract":
      result = a - b;
      break;
    // §5.3.1 On your own + With AI
    case "multiply":
      result = a * b;
      break;
    case "divide":
      if (b === 0) {
        return Response.json(
          { error: "Cannot divide by zero" },
          { status: 400 },
        );
      }
      result = a / b;
      break;
    default:
      return Response.json({ error: "Invalid operation" }, { status: 400 });
  }
  if (!Number.isFinite(result)) {
    return Response.json({ error: "Result is out of range" }, { status: 400 });
  }
  return Response.json({ a, b, operation, result });
}
