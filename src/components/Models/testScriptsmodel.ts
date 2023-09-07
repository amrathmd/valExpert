interface TestScript {
    _Id?: string;
    testsetId: string;
    Type: string;
    purpose: string;
    acceptanceCriteria: string;
    prerequesites: string;
    result: string;
    author: string;
    testCaseNumber: number;
}
export default TestScript;
