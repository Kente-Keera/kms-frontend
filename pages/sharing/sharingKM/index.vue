<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h3 font-weight-bold mb-6">Add Knowledge</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-stepper v-model="step" :items="steps" hide-actions>
          <!-- Step 1: Knowledge Profile -->
          <template v-slot:item.1>
            <v-sheet class="pa-4">
              <h2 class="text-h5 mb-4">Knowledge Profile</h2>
              <v-form @submit.prevent="nextStep">
                <v-text-field
                  v-model="knowledgeProfile.title"
                  label="Title"
                  required
                ></v-text-field>
                <v-textarea
                  v-model="knowledgeProfile.description"
                  label="Short Description"
                  required
                ></v-textarea>
                <v-combobox
                  v-model="knowledgeProfile.tags"
                  :items="availableTags"
                  label="Tags"
                  multiple
                  chips
                  small-chips
                ></v-combobox>
                <v-select
                  v-model="knowledgeProfile.targetGroup"
                  :items="targetGroups"
                  label="Target Group"
                  required
                ></v-select>
                <v-file-input
                  v-model="knowledgeProfile.image"
                  label="Cover Image"
                  accept="image/*"
                  prepend-icon="mdi-camera"
                ></v-file-input>
              </v-form>
              <div class="d-flex justify-space-between mt-5">
                <v-btn
                  color="primary"
                  flat
                  rounded="3"
                  @click="step--"
                  disabled
                >
                  Previous
                </v-btn>
                <v-btn color="primary" flat rounded="3" @click="step++">
                  Next
                </v-btn>
              </div>
            </v-sheet>
          </template>

          <!-- Step 2: Knowledge Content -->
          <template v-slot:item.2>
            <v-sheet class="pa-4">
              <h2 class="text-h5 mb-4">Knowledge Content</h2>
              <v-form @submit.prevent="nextStep">
                <v-radio-group v-model="contentType" label="Content Type">
                  <v-radio label="Write Text" value="text"></v-radio>
                  <v-radio label="Upload File" value="file"></v-radio>
                </v-radio-group>
                <v-textarea
                  v-if="contentType === 'text'"
                  v-model="content"
                  label="Content"
                  rows="10"
                  required
                ></v-textarea>
                <v-file-input
                  v-else
                  v-model="file"
                  label="File"
                  @change="handleFileUpload"
                  required
                ></v-file-input>
              </v-form>
              <div class="d-flex justify-space-between mt-5">
                <v-btn color="primary" flat rounded="3" @click="step--">
                  Previous
                </v-btn>
                <v-btn color="primary" flat rounded="3" @click="step++">
                  Next
                </v-btn>
              </div>
            </v-sheet>
          </template>

          <!-- Step 3: Review and Submit -->
          <template v-slot:item.3>
            <v-sheet class="pa-4">
              <h2 class="text-h5 mb-4">Review and Submit</h2>
              <v-list>
                <v-list-item>
                  <v-list-item-title>
                    Title: {{ knowledgeProfile.title || "Not provided" }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    Description:
                    {{ knowledgeProfile.description || "Not provided" }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    Tags:
                    {{
                      knowledgeProfile.tags.length
                        ? knowledgeProfile.tags.join(", ")
                        : "None"
                    }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    Target Group:
                    {{ knowledgeProfile.targetGroup || "Not selected" }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title
                    >Content Type: {{ contentType }}</v-list-item-title
                  >
                </v-list-item>
                <v-list-item v-if="contentType === 'text'">
                  <v-list-item-title>
                    Content:
                    {{
                      content
                        ? content.length > 100
                          ? content.substring(0, 100) + "..."
                          : content
                        : "No content provided"
                    }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item v-else>
                  <v-list-item-title
                    >File:
                    {{
                      file ? file.name : "No file selected"
                    }}</v-list-item-title
                  >
                </v-list-item>
                <v-list-item v-if="knowledgeProfile.image">
                  <v-list-item-title
                    >Cover Image:
                    {{ knowledgeProfile.image.name }}</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-sheet>
            <div class="d-flex justify-space-between mt-5">
              <v-btn color="primary" flat rounded="3" @click="step--">
                Previous
              </v-btn>
              <v-btn color="success" flat rounded="3" @click="onBackToShare()">
                Submit
              </v-btn>
            </div>
          </template>
        </v-stepper>
      </v-col>
    </v-row>

    <!-- Navigation buttons for previous, next, and submit -->

    <!-- Success dialog after submission -->
    <v-dialog v-model="successDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5 text-center">Success!</v-card-title>
        <v-card-text class="text-center">
          <v-icon color="success" size="64">mdi-check-circle</v-icon>
          <p class="mt-4">Your Knowledge has been successfully created.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeSuccessDialog">Close</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
        <!-- <div class="d-flex justify-center pa-4">
          <v-btn to="/sharing"> Back to Search </v-btn>
        </div> -->
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      steps: ["Knowledge Profile", "Knowledge Content", "Review and Submit"],
      knowledgeProfile: {
        title: "",
        description: "",
        tags: [],
        targetGroup: "",
        image: null,
      },
      contentType: "text",
      content: "",
      file: null,
      successDialog: false,
      availableTags: [
        "Programming Languages",
        "Web Development",
        "Mobile Development",
        "Database",
        "DevOps",
        "Cloud Computing",
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
        "Cybersecurity",
        "Software Architecture",
        "Agile Methodologies",
        "Version Control",
        "Testing",
        "UI/UX Design",
      ],
      targetGroups: [
        "All",
        "Product Owner",
        "Project Manager",
        "Software Architecture",
        "Developer",
        "Tester",
        "Knowledge Team",
        "Executive Team",
      ],
    };
  },
  methods: {
    nextStep() {
      if (this.step < 3) {
        this.step++;
      }
    },
    onBackToShare() {
      this.successDialog = true;

      setTimeout(() => {
        this.$router.push("/sharing");
      }, 3000);
    },

    prevStep() {
      if (this.step > 1) {
        this.step--;
      }
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    submitKnowledge() {
      console.log("Submitting:", {
        ...this.knowledgeProfile,
        contentType: this.contentType,
        content: this.content,
        file: this.file,
      });
      this.successDialog = true;
    },
    closeSuccessDialog() {
      this.successDialog = false;
      this.resetForm();
      this.$router.push("/sharing");
    },
    resetForm() {
      this.step = 1;
      this.knowledgeProfile = {
        title: "",
        description: "",
        tags: [],
        targetGroup: "",
        image: null,
      };
      this.contentType = "text";
      this.content = "";
      this.file = null;
    },
  },
};
</script>
