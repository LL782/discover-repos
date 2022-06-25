// Hit issue with TS Config for Jest
//
// cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module.ts(1208)

describe('Discover Repos', () => {
  it('Calls GitHub for repositories created in the last seven days with the highest number of stars ', () => {
    expect(true).toBe(false)
  })
})
