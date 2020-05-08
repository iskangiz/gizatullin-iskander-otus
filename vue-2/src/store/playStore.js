import TaskGenerator from '../taskGenerator'

const playStore = {
    state: {
        task: null
    },
    getters: {
    },
    mutations: {
        setTask(store, task) {
          store.task = task;
        },
        setVariables(store, newVar) {
            store.variables = newVar;
        },
    },
    actions: {
        setTask({commit}, settings) {
            let taskGenerator = new TaskGenerator(settings);
            commit('setTask', taskGenerator.generateTask());

            let variablesToShow = [
                {number: 13, operation: "multiple", isHidden: false},
                {number: 2, operation: "multiple", isHidden: true},
                {number: 3240, operation: null, isHidden: true}
            ];
            settings.qwe = 'qwe';

            commit('setVariables', variablesToShow)
        }
    }
};

export default playStore;