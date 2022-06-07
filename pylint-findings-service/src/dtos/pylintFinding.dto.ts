export class PylintFindingDto {
  readonly id: number;
  readonly reportId: number;
  readonly filename: string;
  readonly line: number;
  readonly rule: string;
  readonly message: string;
  readonly category: string;
}
