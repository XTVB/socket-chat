# **Socket Chat Vue.js Test Guide**

## Running Tests

To run all Vue.js unit tests:

1. Navigate to the `socket-chat` directory in the terminal
2. Execute; `npm run test`

## Learning Resources

* [Vue.js Unit Testing Guide](https://vuejs.org/v2/guide/unit-testing.html) - official docs on testing, a very light overview
* [Vue Test Utils](https://vue-test-utils.vuejs.org/) - the official unit testing utility library for Vue.js
* [Testing Vuex Store](https://vuex.vuejs.org/guide/testing.html) - testing the Vuex store itself
* [Vue.js testing handbook](https://lmiller1990.github.io/vue-testing-handbook/) - a collection of short, focused examples on how to test Vue components

## Writing Tests

[Common Tips](https://vue-test-utils.vuejs.org/guides/common-tips.html) are a good place to start, providing an overview of the recommended approach to testing Vue components.

Some key functionality available in [Vue Test Utils](https://vue-test-utils.vuejs.org/):

* [createLocalVue()](https://vue-test-utils.vuejs.org/api/#createlocalvue) - returns a Vue class for you to add components, mixins and install plugins without polluting the global Vue class
* [shallowMount(ComponentToTest)](https://vue-test-utils.vuejs.org/api/#shallowmount) - returns a Wrapper that contains the mounted and rendered Vue component, but with stubbed child components. **This should be used over mount() where we only need child components stubbed** 
* [mount(ComponentToTest)](https://vue-test-utils.vuejs.org/api/#mount) - returns a Wrapper that contains the mounted and rendered Vue component
* [Wrapper](https://vue-test-utils.vuejs.org/api/wrapper/) - an object that contains a mounted component or vnode and methods to test the component
* [Mocking Vuex as Component Dependency](https://vue-test-utils.vuejs.org/guides/using-with-vuex.html) - testing a component that has a dependency on Vuex will require us to mock the Vuex store

The [Vuex guide](https://vuex.vuejs.org/guide/testing.html) and  [Vue Test Utils](https://vue-test-utils.vuejs.org/guides/using-with-vuex.html#testing-a-vuex-store) show us how to test the Vuex store itself.

Example Test:
```
## ComponentToTest.spec.ts ##

const localVue = createLocalVue();
localVue.use(Vuex);

describe('testing some functionality on my component', () => {
  it('should behave in this way way under the provided conditions', () => {
    
    let store = new Vuex.Store({
      modules: {
        meeting: {
          namespaced: meetingModule.namespaced,
          getters: {
            mockGetterOnTheModule: () => true,  
          },
        },  
      },
    });
          
    const wrapper = shallowMount(ComponentToTest, {store, localVue});
    
    expect(wrapper.contains('something')).toBe(true);
  }
    
  it('should ..', () => {})
}

// other 
describe('testing some other functionality on my component...
```