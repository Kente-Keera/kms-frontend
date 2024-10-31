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
              <v-form>
                <v-text-field
                  v-model="knowledgeProfile.title"
                  label="Title"
                  required
                  variant="outlined"
                ></v-text-field>
                <v-textarea
                  v-model="knowledgeProfile.description"
                  label="Short Description"
                  required
                  variant="outlined"
                ></v-textarea>
                <v-combobox
                  v-model="knowledgeProfile.type"
                  :items="availableType"
                  label="Type of Knowledge"
                  variant="outlined"
                ></v-combobox>
                <v-combobox
                  v-model="knowledgeProfile.group"
                  :items="groupList"
                  label="Group of Knowledge"
                  variant="outlined"
                ></v-combobox>
                <v-combobox
                  :disabled="!knowledgeProfile.group"
                  v-model="knowledgeProfile.category"
                  :items="cateList"
                  label="Category"
                  variant="outlined"
                ></v-combobox>
                <v-combobox
                  :disabled="!knowledgeProfile.category"
                  v-model="knowledgeProfile.subcategory"
                  :items="subCateList"
                  label="Sub-Category"
                  variant="outlined"
                ></v-combobox>
                <v-combobox
                  v-model="knowledgeProfile.tags"
                  :items="availableTags"
                  label="Tag Knowledge"
                  multiple
                  chips
                  small-chips
                  variant="outlined"
                  allow-overflow
                  :filter="filterTags"
                ></v-combobox>
                <!-- <v-combobox
                  v-model="knowledgeProfile.targetGroup"
                  :items="availabletargetGroups"
                  label="Target Reader"
                  multiple
                  chips
                  small-chips
                  variant="outlined"
                ></v-combobox> -->
                <!-- <v-file-input
                  v-model="knowledgeProfile.image"
                  label="Cover Image"
                  accept="image/*"
                  prepend-icon="mdi-camera"
                ></v-file-input> -->
              </v-form>
              <div class="d-flex justify-space-between mt-5">
                <v-btn
                  color="primary"
                  flat
                  rounded="3"
                  @click="prevStep"
                  :disabled="step === 1"
                >
                  Previous
                </v-btn>
                <v-btn color="primary" flat rounded="3" @click="nextStep">
                  Next
                </v-btn>
              </div>
            </v-sheet>
          </template>

          <!-- Step 2: Knowledge Content -->
          <template v-slot:item.2>
            <v-sheet class="pa-4">
              <h2 class="text-h5 mb-4">Knowledge Content</h2>
              <v-form>
                <v-radio-group v-model="contentType" label="Content form">
                  <v-radio label="Write Text" value="text"></v-radio>
                  <v-radio label="Upload File" value="file"></v-radio>
                </v-radio-group>

                <v-textarea
                  v-if="contentType === 'text'"
                  v-model="content"
                  label="Type your content here!"
                  rows="10"
                  required
                  variant="outlined"
                ></v-textarea>
                <v-file-input
                  v-else
                  v-model="file"
                  label="File"
                  @change="handleFileUpload"
                  required
                ></v-file-input>
              </v-form>

              <v-card class="pa-5">
                <div v-html="content"></div>
              </v-card>
              <div class="d-flex justify-space-between mt-5">
                <v-btn color="primary" flat rounded="3" @click="prevStep">
                  Previous
                </v-btn>
                <v-btn color="primary" flat rounded="3" @click="nextStep">
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
                    Type of knowledge:
                    {{ knowledgeProfile.type || "Not selected" }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    Group: {{ knowledgeProfile.group || "Not selected" }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    Category: {{ knowledgeProfile.category || "Not selected" }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    Subcategory:
                    {{ knowledgeProfile.subcategory || "Not selected" }}
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
                <!-- <v-list-item>
                  <v-list-item-title>
                    Target Group:
                    {{ knowledgeProfile.targetGroup || "Not selected" }}
                  </v-list-item-title>
                </v-list-item> -->
                <v-list-item>
                  <v-list-item-title>
                    Content Type: {{ contentType }}
                  </v-list-item-title>
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
                  <v-list-item-title>
                    File: {{ file ? file.name : "No file selected" }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item v-if="knowledgeProfile.image">
                  <v-list-item-title>
                    Cover Image: {{ knowledgeProfile.image.name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
              <div class="d-flex justify-space-between mt-5">
                <v-btn color="primary" flat rounded="3" @click="prevStep">
                  Previous
                </v-btn>
                <v-btn
                  color="success"
                  flat
                  rounded="3"
                  :disabled="submitDisable"
                  @click="submitKnowledge"
                >
                  Submit
                </v-btn>
              </div>
            </v-sheet>
          </template>
        </v-stepper>
      </v-col>
    </v-row>

    <!-- Success Popup -->
    <v-dialog v-model="successDialog" persistent max-width="600px">
      <v-card
        class="pa-4 text-center mx-auto d-flex flex-column align-center"
        elevation="12"
        rounded="lg"
      >
        <v-icon
          class="mb-5"
          color="success"
          icon="mdi-check-circle"
          size="112"
        ></v-icon>
        <h2 class="text-h5 mb-6">Knowledge Added Successfully</h2>
        <p class="mb-4 text-medium-emphasis text-body-2">
          Your knowledge has been successfully added to the system. You will be
          redirected to the sharing page shortly.
        </p>
        <v-divider class="mb-4"></v-divider>
        <div class="text-end">
          <v-btn
            class="text-none"
            color="success"
            variant="flat"
            width="90"
            rounded
            @click="closeSuccessDialog"
          >
            Done
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { useServiceStore } from "../../../stores/serviceStore";

const store = useServiceStore();

await store.getGroup();

const content = ref();

const knowledgeProfile = ref({
  title: "",
  description: "",
  type: "",
  group: "",
  category: "",
  subcategory: "",
  tags: [],
  targetGroup: [],
  image: null,
});

const validateForm = ref(false);

const group = ref(store.group);

const groupList = ref(group.value.map((item) => item.name));
const cateList = ref();
const subCateList = ref();
const subCateId = ref();

watch(
  knowledgeProfile,
  async (newQuestion, oldQuestion) => {
    const listCate = group.value.find(
      (item) => item.name === knowledgeProfile.value?.group
    );
    cateList.value = await listCate?.cate?.map((item) => item.name);

    const listSubCate = await listCate?.cate?.filter(
      (item) => item?.name === knowledgeProfile?.value?.category
    );

    subCateList.value = await listSubCate[0]?.sub_cate?.map(
      (item) => item.name
    );

    const subcateId = listSubCate[0]?.sub_cate?.filter(
      (item) => item?.name === knowledgeProfile.value?.subcategory
    );

    subCateId.value = subcateId[0]?.id;
  },
  { deep: true }
);

const submitDisable = ref(false);
const successDialog = ref(false);

const file = ref(null);

const user = useCookie("_user");

const submitKnowledge = async () => {
  let formData = new FormData();

  formData.append("title", knowledgeProfile.value.title);
  formData.append("description", knowledgeProfile.value.description);
  formData.append("type", knowledgeProfile.value.type);
  formData.append("group", knowledgeProfile.value.group);
  formData.append("category", knowledgeProfile.value.category);
  formData.append("sub_categoryId", subCateId.value);
  formData.append("tag", knowledgeProfile.value.tags);
  formData.append("targetGroup", knowledgeProfile.value.targetGroup);
  formData.append("content", content.value);
  formData.append("file", file.value);
  formData.append("userId", user.value);

  const resp = await store.createKnowledge(formData);

  if (resp === "SUCCESS") {
    successDialog.value = true;

    setTimeout(() => {
      submitDisable.value = false;
      navigateTo({ path: "/sharing" });
    }, 3000);
  } else {
    submitDisable.value = false;
  }
};

const closeSuccessDialog = async () => {
  submitDisable.value = false;
  navigateTo({ path: "/sharing" });
};
</script>

<script>
export default {
  data() {
    return {
      step: 1,
      steps: ["Knowledge Profile", "Knowledge Content", "Review and Submit"],
      knowledgeProfile: {
        title: "",
        description: "",
        type: "",
        group: "",
        category: "",
        subcategory: "",
        tags: [],
        targetGroup: [],
        image: null,
      },
      contentType: "text",

      successDialog: false,
      availableType: ["Tacit Knowledge", "Explicit Knowledge"],

      availableTags: [
        "Type of Requirement",
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
      availabletargetGroups: [
        "All",
        "Executive Team",
        "Knowledge Team",
        "Product Owner",
        "Project Manager",
        "Software Architect",
        "Developer",
        "Tester",
        "Knowledge Team",
      ],
    };
  },
  methods: {
    nextStep() {
      if (this.step < 3) {
        this.step++;
      }
    },
    prevStep() {
      if (this.step > 1) {
        this.step--;
      }
    },

    handleFileUpload(event) {
      this.file = event.target.files[0];
    },

    resetForm() {
      this.step = 1;
      this.knowledgeProfile = {
        title: "",
        description: "",
        type: "",
        group: "",
        category: "",
        subcategory: "",
        tags: [],
        targetGroup: [],
        image: null,
      };
      this.contentType = "text";

      this.file = null;
    },
    filterTags(item, queryText, itemText) {
      return itemText
        .toString()
        .toLowerCase()
        .includes(queryText.toLowerCase());
    },
  },
};
</script>
