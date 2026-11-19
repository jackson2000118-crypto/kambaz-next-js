export type Assignment = {
  id: number;
  title: string;
  description: string;
  due: string;
  completed: boolean;
  score: number;
};
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
};
export type CalculatorResult = {
  a: number;
  b: number;
  operation: string;
  result: number;
};
