const getAthleteStats = (z, bundle) => {
  // get the athlete to see the id
  const promise = z.request(`${process.env.API_URL}/athlete`);
  return promise.then(function(response){
    const athleteInfo = JSON.parse(response.content);
    const athleteId = athleteInfo.id;
    z.console.log(`Athlete id: ${athleteId}`);
    // do a request to the stats
    const statsPromise = z.request(`${process.env.API_URL}/athletes/${athleteId}/stats`);
    return statsPromise.then((response) => {
      const stats = JSON.parse(response.content);
      stats.id = athleteId;
      return [stats];
    });
  });
};

module.exports = {
  key: 'athleteStats',
  noun: 'Athlete Stats',
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
