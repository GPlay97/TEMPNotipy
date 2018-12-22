<template>
    <v-card class="mx-auto" max-width="400">
        <v-card dark flat>
            <v-btn absolute bottom color="blue" right fab>
                <v-icon>mdi-chart-line</v-icon>
            </v-btn>
            <v-card-title class="pa-2 dark lighten-3" style="height:64px">
                <h3 class="title font-weight-light text-xs-center grow" style="padding-left: 44px">TEMPNotipy</h3>
                <v-btn icon>
                    <v-icon @click="getTemperature()">mdi-refresh</v-icon>
                </v-btn>
            </v-card-title>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/forest.jpg" gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)">
                <v-container fill-height>
                    <v-layout align-center>
                        <strong class="display-4 font-weight-regular mr-4" style="font-size: 70px!important">{{ convertTemperature(temperature) }}°</strong>
                        <v-layout column justify-end>
                            <div class="headline font-weight-light">{{ convertToWeekday(day) }}</div>
                            <div class="text-uppercase font-weight-light">{{ convertToMonth(month) }} {{ year }}</div>
                        </v-layout>
                    </v-layout>
                </v-container>
            </v-img>
        </v-card>
        <v-card-text class="py-0">
            <v-timeline align-top dense>
                <v-timeline-item color="pink" small>
                    <v-layout pt-3>
                        <v-flex xs3>
                            <strong>2am</strong>
                        </v-flex>
                        <v-flex>
                            <strong>21.67°</strong>
                        </v-flex>
                    </v-layout>
                </v-timeline-item>

                <v-timeline-item color="teal lighten-3" small>
                    <v-layout wrap pt-3>
                        <v-flex xs3>
                            <strong>0-2am</strong>
                        </v-flex>
                        <v-flex>
                            <strong style="color: #ea4763">25.03°</strong>
                        </v-flex>
                    </v-layout>
                </v-timeline-item>

                <br><br><br>

                <v-timeline-item color="pink" small>
                    <v-layout pt-3>
                        <v-flex xs3>
                            <strong>16pm</strong>
                        </v-flex>
                        <v-flex>
                            <strong>21.80°</strong>
                        </v-flex>
                    </v-layout>
                </v-timeline-item>

                <v-timeline-item color="teal lighten-3" small>
                    <v-layout pt-3>
                        <v-flex xs3>
                            <strong>14-15am</strong>
                        </v-flex>
                        <v-flex>
                            <strong style="color: #2196f3">19.54°</strong>
                        </v-flex>
                    </v-layout>
                </v-timeline-item>
            </v-timeline>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            day: new Date().getDay(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            temperature: 0
        };
    },
    methods: {
        convertToWeekday(day) {
            return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day];
        },
        convertToMonth(month) {
            return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Oktober', 'November', 'December'][month];
        },
        convertTemperature(temperature) {
            return parseFloat(temperature).toFixed(2);
        },
        getTemperature() {
            this.$http.get(RESTURL + '/temperature').then(res => {
                this.temperature = res.body.temperature;
            }, err => console.log(err));
        }
    },
    mounted() {
        this.getTemperature();
    }
}
</script>
