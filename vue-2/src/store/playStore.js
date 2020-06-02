import TaskGenerator from '../taskGenerator'

const playStore = {
    state: {
        task: null,
        userInputValue: '?',
        userEqualitySign: '?',
        settings: null,
        taskSuccessfulSolved: null
    },
    getters: {
        getIsTaskEqualityTask(store) {
            return store.task.isEquality;
        },
        getTaskNumbers(store) {
            return store.task.numbers;
        },
        getTaskResultToShow(store) {
            return store.task.resultToShow;
        },
        getUserInputValue(store) {
            return store.userInputValue;
        },
        getUserEqualitySign(store) {
            return store.userEqualitySign;
        }
    },
    mutations: {
        setTask(store, task) {
            store.task = task;
            store.taskSuccessfulSolved = null
            store.userInputValue = '?';
            store.userEqualitySign = '?';
        },
        addUserInputNumber(store, number) {
            if (store.userInputValue === '?') {
                if (number >= 1 && number <= 9)
                    store.userInputValue = number;
            } else {
                if (number !== '-')
                    store.userInputValue += number.toString();
                else
                    store.userInputValue = '-' + store.userInputValue;
            }
        },
        deleteUserInputNumber(store) {
            if (store.userInputValue !== '?')
                store.userInputValue = store.userInputValue.toString().substring(0, store.userInputValue.length - 1);
            if (store.userInputValue === '')
                store.userInputValue = '?';
        },
        setUserEqualitySign(store, equalitySign) {
            store.userEqualitySign = equalitySign;
        },
        checkTask(store) {
            if(store.task.isEquality) {
                switch (store.userEqualitySign) {
                    case '>':
                        store.taskSuccessfulSolved = store.task.result > store.task.resultToShow;
                        break;
                    case '<':
                        store.taskSuccessfulSolved = store.task.result < store.task.resultToShow;
                        break;
                    case '=':
                        store.taskSuccessfulSolved = store.task.result === store.task.resultToShow;
                        break;
                    default:
                        store.taskSuccessfulSolved = false;
                }
            } else {
                store.taskSuccessfulSolved =  parseInt(store.userInputValue) === store.task.result;
            }
            let alertText = store.taskSuccessfulSolved? "Правильно":"Неправильно";
            alert(alertText);
        }
    },
    actions: {
        setTask({commit, getters}) {
            let taskGenerator = new TaskGenerator(getters.getAllSettings);
            commit('setTask', taskGenerator.generateTask());
            commit('setTask', taskGenerator.generateTask());
        },
        submitTask({commit, dispatch}) {
            commit('checkTask');
            dispatch('setTask');
        }
    }
};

export default playStore;