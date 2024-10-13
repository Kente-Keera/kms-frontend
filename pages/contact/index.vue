<template>
    <v-container class="contact-page" fluid>
      <v-row justify="center" class="my-10">
        <v-col cols="12" md="8" class="text-center">
          <h1 class="display-3 font-weight-bold">Contact our team</h1>
          <p class="subtitle-1">
            Got any questions about the product or scaling on our platform? We’re here to help.
            Chat to our friendly team 24/7 and get onboard in less than 5 minutes.
          </p>
        </v-col>
      </v-row>
  
      <v-row justify="center" class="mx-auto" align="center">
        <!-- Left Form Section -->
        <v-col cols="12" md="6">
          <v-form>
            <!-- First Name and Last Name -->
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="First name"
                  outlined
                  dense
                  placeholder="First name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Last name"
                  outlined
                  dense
                  placeholder="Last name"
                ></v-text-field>
              </v-col>
            </v-row>
  
            <!-- Employee Id -->
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Employee ID"
                  outlined
                  dense
                  placeholder="Employee ID"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Line ID"
                  outlined
                  dense
                  placeholder="Last name"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Email -->
            <v-text-field
              label="Email"
              outlined
              dense
              placeholder="you@company.com"
            ></v-text-field>
  
            <!-- Phone Number -->
            <v-text-field
              label="Phone number"
              outlined
              dense
              placeholder="+66 (555) 000-0000"
            ></v-text-field>
  
            <!-- Message -->
            <v-textarea
              label="Message"
              outlined
              dense
              placeholder="Leave us a message..."
              rows="4"
            ></v-textarea>
  
            <!-- Services -->
            <v-row>
              <v-col cols="6">
                <v-checkbox label="Website design" dense></v-checkbox>
                <v-checkbox label="UX design" dense></v-checkbox>
                <v-checkbox label="User research" dense></v-checkbox>
              </v-col>
              <v-col cols="6">
                <v-checkbox label="Content creation" dense></v-checkbox>
                <v-checkbox label="Strategy & consulting" dense></v-checkbox>
                <v-checkbox label="Other" dense></v-checkbox>
              </v-col>
            </v-row>
  
            <!-- Submit Button -->
            <v-btn block large color="black" class="mt-4 white--text">
              Send message
            </v-btn>
          </v-form>
        </v-col>
  
        <!-- Right Section (Contact Info) -->
        <v-col cols="12" md="4">
          <!-- Chat with us -->
          <h4 class="font-weight-bold">Chat with us</h4>
          <p>Speak to our friendly team via live chat.</p>
          <v-list dense>
            <v-list-item>
              <v-icon left>mdi-chat</v-icon>
              <v-list-item-content>
                <v-list-item-title>Start a live chat</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-icon left>mdi-email</v-icon>
              <v-list-item-content>
                <v-list-item-title>Shoot us an email</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-icon left>mdi-twitter</v-icon>
              <v-list-item-content>
                <v-list-item-title>Message us on X</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
  
          <!-- Call us -->
          <h4 class="font-weight-bold mt-6">Call us</h4>
          <p>Call our team Mon-Fri from 8am to 5pm.</p>
          <v-list dense>
            <v-list-item>
              <v-icon left>mdi-phone</v-icon>
              <v-list-item-content>
                <v-list-item-title>+1 (555) 000-0000</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
  
          <!-- Visit us -->
          <h4 class="font-weight-bold mt-6">Visit us</h4>
          <p>Chat to us in person at our Melbourne HQ.</p>
          <v-list dense>
            <v-list-item>
              <v-icon left>mdi-map-marker</v-icon>
              <v-list-item-content>
                <v-list-item-title>100 Smith Street, Collingwood VIC 3066</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'Contact',
  };
  </script>
  
  <style scoped>
  h1 {
    font-weight: bold;
  }
  
  .subtitle-1 {
    color: #555;
  }
  
  .v-btn {
    border-radius: 8px;
  }
  
  .mt-4 {
    margin-top: 1.5rem;
  }
  
  .mt-6 {
    margin-top: 2.5rem;
  }
  </style>
  