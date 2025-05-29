import MiniTaskTracker from './src/MiniTaskTracker'

const taskTracker = new MiniTaskTracker({
  storageKey: 'MiniTaskTracker'
})

taskTracker.render('#mini-task-tracker')
