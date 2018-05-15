const Vue = require("nativescript-vue");

new Vue({
  data() {
    return {
      todos: [],
      dones: [],
      textFieldValue: "",
    }
  },
  methods: {
    onItemTap: function (args) {
      action('What do you want to do with this task?', 'Cancel', ['Mark completed', 'Delete forever'])
        .then(result => {
          console.log(result); // Logs the selected option for debugging.
          switch (result) {
            case 'Mark completed':
              this.dones.unshift(args.item); // Places the tapped active task at the top of the completed tasks.
              this.todos.splice(args.index, 1); // Removes the tapped active task.
              break;
            case 'Delete forever':
              this.todos.splice(args.index, 1);
              break;
            case 'Cancel' || undefined:
              break;
          }
        })
    },
    onDoneTap: function (args) {
      action('What do you want to do with this task?', 'Cancel', ['Mark to do', 'Delete forever'])
        .then(result => {
          console.log(result); // Logs the selected option for debugging.
          switch (result) {
            case 'Mark to do':
              this.todos.unshift(args.item); // Places the tapped completed task at the top of the to do tasks.
              this.dones.splice(args.index, 1); // Removes the tapped completed task.
              break;
            case 'Delete forever':
              this.dones.splice(args.index, 1); // Removes the tapped completed task.
              break;
            case 'Cancel' || undefined:
              break;
          }
        })
    },
    onButtonTap() {
      console.log("New task added: " + this.textFieldValue + "."); // Logs the newly added task in the console for debugging.
      this.todos.unshift({ name: this.textFieldValue }); // Adds tasks in the ToDo array. Newly added tasks are immediately shown on the screen. 
      this.textFieldValue = ""; // Clears the text field so that users can start adding new tasks immediately.
    }
  },

  template: `
    <Page class="page">
      <ActionBar title="My Tasks" class="action-bar" />
      
      <TabView height="100%">
        <TabViewItem title="To Do">
          <!-- Positions an input field, a button, and the list of tasks in a grid. -->
          <StackLayout orientation="vertical" width="100%" height="100%">
            <GridLayout columns="2*,*" rows="auto" width="100%">
              <TextField row="0" col="0" v-model="textFieldValue" hint="Type new task..." editable="true" @returnPress="onButtonTap" /> <!-- Configures the text field and ensures that pressing Return on the keyboard produces the same result as tapping the button. -->
              <Button id="add-task-button" row="0" col="1" text="Add task" @tap="onButtonTap" />
            </GridLayout>
            <ListView for="todo in todos" @itemTap="onItemTap" height="100%" > <!-- Make sure to set a height or your list will not show on iOS. -->
              <v-template>
                <Label :text="todo.name" />
              </v-template>
            </ListView>
          </StackLayout> 
        </TabViewItem>

        <TabViewItem title="Completed">
          <ListView for="done in dones" @itemTap="onDoneTap" height="100%" > <!-- Make sure to set a height or your list will not show on iOS. -->
              <v-template>
                <Label :text="done.name" />
              </v-template>
            </ListView>
        </TabViewItem>
      </TabView>

    </Page>
  `,

}).$start()