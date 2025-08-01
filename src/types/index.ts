export interface Repository {
  id: number;
  name: string;
  url: string;
}

export interface CommitDivision {
  new_commit_message: string;
  files: string[];
  scheduled_date?: string;
}
