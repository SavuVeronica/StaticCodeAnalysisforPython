export class SonarFindingDto {
  readonly id: number;
  readonly reportId: number;
  readonly filename: string;
  readonly line: number;
  readonly rule: string;
  readonly message: string;
  readonly category: string;
  readonly effortToSolve: string;
  readonly Type: string;
}
