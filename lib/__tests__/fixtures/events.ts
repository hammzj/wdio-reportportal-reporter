export const suiteStartEvent = () => ({uid: "FooBarSuite", cid: "0-0", title: "foo", runner: {"0-0": {}}});
export const suiteEndEvent = () => ({uid: "FooBarSuite", cid: "0-0", title: "foo"});
export const testStartEvent = () => ({uid: "FooBarTest", fullTitle: "fullTitle", type: 'test', cid: "0-0", title: "foo", runner: {"0-0": {}}});
