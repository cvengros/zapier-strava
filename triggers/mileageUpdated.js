// milestones in km
const MILESTONES = {
  Ride: 500,
  Run: 50,
  Swim: 10
}

const roundStat = (stat, type) => {
  // all stats are in meters
  const statKm = stat/1000;
  const milestone = MILESTONES[type];
  // getting the last milestone reached
  return Math.floor(statKm/milestone) * milestone;
}

const roundAllStats = (stats) => {
  // take all needed stats and round them, return in an object
  const r = {};
  r.ytd_ride_distance = roundStat(stats.ytd_ride_totals.distance, 'Ride');
  r.all_ride_distance = roundStat(stats.all_ride_totals.distance, 'Ride');
  r.ytd_run_distance = roundStat(stats.ytd_run_totals.distance, 'Run');
  r.all_run_distance = roundStat(stats.all_run_totals.distance, 'Run');
  r.ytd_swim_distance = roundStat(stats.ytd_swim_totals.distance, 'Swim');
  r.all_swim_distance = roundStat(stats.all_swim_totals.distance, 'Swim');
  return r;
}

const concatStats = (roundedStats) => {
  // take all rounded stats (sorted by its key so that it's consistent)
  // and join them into a string
  return Object.keys(roundedStats).sort().map((k) => roundedStats[k]).join(' ');
}

const getAthleteStats = (z, bundle) => {
  // get the athlete to see the id
  const athletePromise = z.request(`${process.env.API_URL}/athlete`);
  return athletePromise.then(function(response){
    const athleteInfo = JSON.parse(response.content);
    const athleteId = athleteInfo.id;
    z.console.log(`Athlete id: ${athleteId}`);
    
    // do a request to the stats
    const statsPromise = z.request(`${process.env.API_URL}/athletes/${athleteId}/stats`);

    // and to the activities
    const activitiesPromise = z.request(`${process.env.API_URL}/athlete/activities`);
    return Promise.all([statsPromise, activitiesPromise]).then((responses) => {
      const stats = JSON.parse(responses[0].content);
      const activities
      
      // round all the watched stats
      stats.rounded = roundAllStats(stats);
      z.console.log(`rounded stats: ${stats.rounded}`);
      
      // hack the id into a concat of all watched stats
      stats.id = concatStats(stats.rounded);

      // iterate over the recent activities, see if some has gone 
      // over a milestone
      // clone the stats so that we don't overwrite the current ones
      const s = JSON.parse(JSON.stringify(stats));
      for (let i = 0; i < activities.length; i++) {
        let a = activities[i];
        // subtract the distance from the stats
        let activityType = a.type.toLowerCase();
        s[`ytd_${activityType}_totals`].distance -= a.distance;
        s[`all_${activityType}_totals`].distance -= a.distance;

        // round it and see if it's the same as the current

        // if not, we've got it. Return it and break
      }
      return [stats];
    });
  });
};

module.exports = {
  key: 'athleteStats',
  noun: 'Athlete Stat',
  display: {
    label: 'Athlete Stats Updated',
    description: 'Trigger when an athlete stats have been updated'
  },
  operation: {
    perform: getAthleteStats,
    sample:{
      "id": 123,
      "biggest_ride_distance": 198794.0,
      "biggest_climb_elevation_gain": 1158.0,
      "recent_ride_totals": {
        "count": 4,
        "distance": 110801.0,
        "moving_time": 18868,
        "elapsed_time": 21646,
        "elevation_gain": 1154.7627563476562,
        "achievement_count": 32
      },
      "recent_run_totals": {
        "count": 4,
        "distance": 45933.0,
        "moving_time": 15051,
        "elapsed_time": 15636,
        "elevation_gain": 978.2162322998047,
        "achievement_count": 21
      },
      "recent_swim_totals": {
        "count": 1,
        "distance": 2300.0,
        "moving_time": 2709,
        "elapsed_time": 4947,
        "elevation_gain": 0.0,
        "achievement_count": 0
      },
      "ytd_ride_totals": {
        "count": 7,
        "distance": 258167,
        "moving_time": 39317,
        "elapsed_time": 42609,
        "elevation_gain": 2363
      },
      "ytd_run_totals": {
        "count": 23,
        "distance": 232820,
        "moving_time": 76892,
        "elapsed_time": 82007,
        "elevation_gain": 4951
      },
      "ytd_swim_totals": {
        "count": 5,
        "distance": 8900,
        "moving_time": 11071,
        "elapsed_time": 20905,
        "elevation_gain": 0
      },
      "all_ride_totals": {
        "count": 806,
        "distance": 31823684,
        "moving_time": 5777722,
        "elapsed_time": 6885142,
        "elevation_gain": 530344
      },
      "all_run_totals": {
        "count": 218,
        "distance": 1704306,
        "moving_time": 593373,
        "elapsed_time": 656025,
        "elevation_gain": 21792
      },
      "all_swim_totals": {
        "count": 121,
        "distance": 194266,
        "moving_time": 303366,
        "elapsed_time": 341130,
        "elevation_gain": 388
      }
    }
  }
};
