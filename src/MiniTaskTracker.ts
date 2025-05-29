import AppStorage from './AppStorage'

type TTask = {
  id: string
  completed?: boolean
  description: string
}

type TMiniTaskTrackerStorage = {
  tasks: TTask[]
}

type TMiniTaskTrackerOptions = {
  storageKey?: string
}

class MiniTaskTracker {
  private tasks: TTask[] = []
  private storage: AppStorage<TMiniTaskTrackerStorage> | null = null

  private containerElement!: HTMLElement | null
  private taskListElement!: HTMLUListElement
  private taskInputElement!: HTMLInputElement
  private taskCounterElement!: HTMLParagraphElement

  constructor(options: TMiniTaskTrackerOptions) {
    this.initStorage(options)
  }

  private initStorage({ storageKey }: TMiniTaskTrackerOptions) {
    if (!storageKey) return
    this.storage = new AppStorage<TMiniTaskTrackerStorage>(storageKey, { tasks: this.tasks })
    const { tasks } = this.storage.getData()
    this.tasks = tasks
  }

  render(selector: string): void {
    this.setupContainer(selector)
    this.buildUI()
    this.renderTasks()
    this.updateCounter()
    this.taskInputElement.focus()
  }

  private setupContainer(selector: string) {
    if (this.containerElement) throw new Error('Element already rendered.')
    this.containerElement = document.querySelector(selector)
    if (!this.containerElement) throw new Error(`Element with selector "${selector}" not found.`)
    this.containerElement.classList.add('mini-task-tracker')
  }

  private buildUI() {
    this.taskListElement = document.createElement('ul')

    this.taskInputElement = document.createElement('input')
    this.taskInputElement.type = 'text'
    this.taskInputElement.placeholder = 'Enter a task description...'

    const addTaskButton = document.createElement('button')
    addTaskButton.type = 'submit'
    addTaskButton.textContent = 'Add Task'

    const feedbackMessage = document.createElement('div')
    feedbackMessage.classList.add('invalid-feedback')
    feedbackMessage.textContent = 'Please enter a valid task.'

    this.taskCounterElement = document.createElement('p')

    const taskForm = document.createElement('form')
    taskForm.append(this.taskInputElement, addTaskButton, feedbackMessage, this.taskCounterElement)

    this.containerElement!.append(this.taskListElement, taskForm)

    taskForm.addEventListener('submit', e => this.handleSubmit(e))
  }

  private handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    this.createTask()
  }

  private createTask() {
    this.clearInputValidation()

    const description = this.taskInputElement.value.trim()
    if (!description) {
      this.markInputInvalid()
      return
    }

    const task: TTask = { id: crypto.randomUUID(), description }
    this.tasks.unshift(task)

    this.renderTask(task)

    this.taskInputElement.value = ''
    this.updateCounter()
    this.storeTasks()
    this.containerElement!.scrollTo({ top: 0, behavior: 'smooth' })
  }

  private clearInputValidation() {
    this.taskInputElement.classList.remove('is-invalid')
  }

  private markInputInvalid() {
    this.taskInputElement.classList.add('is-invalid')
  }

  private renderTask(task: TTask) {
    const taskElement = this.createTaskListElement(task)
    this.taskListElement.prepend(taskElement)
  }

  private createTaskListElement(task: TTask): HTMLLIElement {
    const taskElement = document.createElement('li')

    const checkBox = this.createCheckbox(task)
    const label = this.createLabel(task)
    const btn = this.createDeleteButton()
    btn.addEventListener('click', () => {
      this.deleteTask(task.id)
      this.taskListElement.removeChild(taskElement)
    })
    taskElement.append(checkBox, label, btn)
    return taskElement
  }

  private createCheckbox(task: TTask): HTMLInputElement {
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.id = `task-${task.id}`
    checkbox.checked = !!task.completed
    checkbox.addEventListener('change', () => this.toggleTaskCompletion(task.id, checkbox.checked))
    return checkbox
  }

  private createLabel(task: TTask): HTMLLabelElement {
    const label = document.createElement('label')
    label.htmlFor = `task-${task.id}`
    label.textContent = task.description
    label.title = 'Mark as completed'
    label.classList.toggle('task-completed', !!task.completed)
    return label
  }

  private createDeleteButton(): HTMLButtonElement {
    const btn = document.createElement('button')
    btn.textContent = 'Delete'
    return btn
  }

  private toggleTaskCompletion(taskId: string, completed: boolean) {
    const task = this.tasks.find(t => t.id === taskId)
    if (!task) return

    task.completed = completed
    this.tasks.sort(this.sortTasks)
    this.renderTasks()
    this.updateCounter()
    this.storeTasks()
  }

  private deleteTask(taskId: string) {
    this.tasks = this.tasks.filter(t => t.id !== taskId)
    this.updateCounter()
    this.storeTasks()
  }

  private renderTasks() {
    this.taskListElement.innerHTML = ''
    this.tasks.forEach(task => {
      const taskElement = this.createTaskListElement(task)
      this.taskListElement.appendChild(taskElement)
    })
  }

  private updateCounter() {
    if (!this.tasks.length) {
      this.taskCounterElement.innerText = 'No tasks'
      return
    }

    const completed = this.tasks.filter(t => t.completed).length
    this.taskCounterElement.innerText = `${completed} of ${this.tasks.length} tasks completed`
  }

  private sortTasks(a: TTask, b: TTask): number {
    return (a.completed ? 1 : 0) - (b.completed ? 1 : 0)
  }

  private storeTasks(): void {
    this.storage?.setData({ tasks: this.tasks })
  }
}

export default MiniTaskTracker
