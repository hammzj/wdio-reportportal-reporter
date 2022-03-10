import {ExtraSuiteData, ExtraTestData, StorageEntity} from "./entities";

export class Storage {
  private testItems = new Map<string, StorageEntity>();
  private allTestItems = new Array<StorageEntity>();
  private suites = new Array<StorageEntity>();
  private extraSuiteData = new Array<ExtraSuiteData>();
  private extraTestData = new Map<string, ExtraTestData>();

  public getCurrentSuite() {
    const currentSuite = this.suites[this.suites.length - 1];
    return currentSuite ? currentSuite : null;
  }

  public getCurrentTest() {
    const activeTests = Array.from(this.testItems.values());
    if (activeTests.length === 0) {
      return null;
    }
    return activeTests[activeTests.length - 1];
  }

  public addSuite(value: StorageEntity) {
    this.suites.push(value);
    this.extraSuiteData.push(new ExtraSuiteData(value.id));
  }

  public removeSuite() {
    this.suites.pop();
    this.extraSuiteData.pop();
  }

  // TODO: make available for all suites
  public getExtraSuiteData() {
    const {id} = this.getCurrentSuite();
    return this.extraSuiteData.find(esd => esd.id === id);
  }

  public addTest(uid: string, value: StorageEntity) {
    this.testItems.set(uid, value);
    this.extraTestData.set(uid, new ExtraTestData(uid));
    this.allTestItems.push(value);
  }

  public removeTest(item: StorageEntity) {
    this.extraTestData.delete(item.wdioEntity.uid);
    return this.testItems.delete(item.wdioEntity.uid);
  }

  public getStartedTests(): StorageEntity[] {
    const tests = this.allTestItems || [];
    return tests.slice();
  }

  public getExtraTestData() {
    const {wdioEntity} = this.getCurrentTest();
    return this.extraTestData.get(wdioEntity.uid);
  }

  private addExtraDataToSuite(key: string, data: object) {
    const extraSuiteData = this.getExtraSuiteData();
    if (extraSuiteData) {
      extraSuiteData[key] = data;
    }
  }
}
