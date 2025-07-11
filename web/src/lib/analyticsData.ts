// Processed data from btc_60d_yf.csv and simulated_inference_data_60d.csv
export interface BTCDataPoint {
  Date: string;
  Close: number;
  Volume: number;
}

export interface InferenceDataPoint {
  date: string;
  token_price: number;
  energy_price: number;
  hash_price: number;
  gpu_profit: number;
}

export const btcData: BTCDataPoint[] = [
  { Date: "2025-04-23 00:00:00+00:00", Close: 93699.109375, Volume: 41719568821 },
  { Date: "2025-04-24 00:00:00+00:00", Close: 93943.796875, Volume: 31483175315 },
  { Date: "2025-04-25 00:00:00+00:00", Close: 94720.5, Volume: 40915232364 },
  { Date: "2025-04-26 00:00:00+00:00", Close: 94646.9296875, Volume: 17612825123 },
  { Date: "2025-04-27 00:00:00+00:00", Close: 93754.84375, Volume: 18090367764 },
  { Date: "2025-04-28 00:00:00+00:00", Close: 94978.75, Volume: 32363449569 },
  { Date: "2025-04-29 00:00:00+00:00", Close: 94284.7890625, Volume: 25806129921 },
  { Date: "2025-04-30 00:00:00+00:00", Close: 94207.3125, Volume: 28344679831 },
  { Date: "2025-05-01 00:00:00+00:00", Close: 96492.3359375, Volume: 32875889623 },
  { Date: "2025-05-02 00:00:00+00:00", Close: 96910.0703125, Volume: 26421924677 },
  { Date: "2025-05-03 00:00:00+00:00", Close: 95891.796875, Volume: 15775154889 },
  { Date: "2025-05-04 00:00:00+00:00", Close: 94315.9765625, Volume: 18198688416 },
  { Date: "2025-05-05 00:00:00+00:00", Close: 94748.0546875, Volume: 25816260327 },
  { Date: "2025-05-06 00:00:00+00:00", Close: 96802.4765625, Volume: 26551275827 },
  { Date: "2025-05-07 00:00:00+00:00", Close: 97032.3203125, Volume: 76983822462 },
  { Date: "2025-05-08 00:00:00+00:00", Close: 103241.4609375, Volume: 69895404397 },
  { Date: "2025-05-09 00:00:00+00:00", Close: 102970.8515625, Volume: 58198593958 },
  { Date: "2025-05-10 00:00:00+00:00", Close: 104696.328125, Volume: 42276713994 },
  { Date: "2025-05-11 00:00:00+00:00", Close: 104106.359375, Volume: 46285517406 },
  { Date: "2025-05-12 00:00:00+00:00", Close: 102812.953125, Volume: 63250475404 },
  { Date: "2025-05-13 00:00:00+00:00", Close: 104169.8125, Volume: 52608876410 },
  { Date: "2025-05-14 00:00:00+00:00", Close: 103539.4140625, Volume: 45956071155 },
  { Date: "2025-05-15 00:00:00+00:00", Close: 103744.640625, Volume: 50408241840 },
  { Date: "2025-05-16 00:00:00+00:00", Close: 103489.2890625, Volume: 44386499364 },
  { Date: "2025-05-17 00:00:00+00:00", Close: 103191.0859375, Volume: 37898552742 },
  { Date: "2025-05-18 00:00:00+00:00", Close: 106446.0078125, Volume: 49887082058 },
  { Date: "2025-05-19 00:00:00+00:00", Close: 105606.1796875, Volume: 61761126647 },
  { Date: "2025-05-20 00:00:00+00:00", Close: 106791.0859375, Volume: 36515726122 },
  { Date: "2025-05-21 00:00:00+00:00", Close: 109678.078125, Volume: 78086364051 },
  { Date: "2025-05-22 00:00:00+00:00", Close: 111673.28125, Volume: 70157575642 },
  { Date: "2025-05-23 00:00:00+00:00", Close: 107287.796875, Volume: 67548133399 },
  { Date: "2025-05-24 00:00:00+00:00", Close: 107791.15625, Volume: 45903627163 },
  { Date: "2025-05-25 00:00:00+00:00", Close: 109035.390625, Volume: 47518041841 },
  { Date: "2025-05-26 00:00:00+00:00", Close: 109440.3671875, Volume: 45950461571 },
  { Date: "2025-05-27 00:00:00+00:00", Close: 108994.640625, Volume: 57450176272 },
  { Date: "2025-05-28 00:00:00+00:00", Close: 107802.328125, Volume: 49155377493 },
  { Date: "2025-05-29 00:00:00+00:00", Close: 105641.7578125, Volume: 56022752042 },
  { Date: "2025-05-30 00:00:00+00:00", Close: 103998.5703125, Volume: 57655287183 },
  { Date: "2025-05-31 00:00:00+00:00", Close: 104638.09375, Volume: 38997843858 },
  { Date: "2025-06-01 00:00:00+00:00", Close: 105652.1015625, Volume: 37397056873 },
  { Date: "2025-06-02 00:00:00+00:00", Close: 105881.53125, Volume: 45819706290 },
  { Date: "2025-06-03 00:00:00+00:00", Close: 105432.46875, Volume: 46196508367 },
  { Date: "2025-06-04 00:00:00+00:00", Close: 104731.984375, Volume: 44544857105 },
  { Date: "2025-06-05 00:00:00+00:00", Close: 101575.953125, Volume: 57479298400 },
  { Date: "2025-06-06 00:00:00+00:00", Close: 104390.34375, Volume: 48856653697 },
  { Date: "2025-06-07 00:00:00+00:00", Close: 105615.625, Volume: 38365033776 },
  { Date: "2025-06-08 00:00:00+00:00", Close: 105793.6484375, Volume: 36626232328 },
  { Date: "2025-06-09 00:00:00+00:00", Close: 110294.1015625, Volume: 55903193732 },
  { Date: "2025-06-10 00:00:00+00:00", Close: 110257.234375, Volume: 54700101509 },
  { Date: "2025-06-11 00:00:00+00:00", Close: 108686.625, Volume: 50842662052 },
  { Date: "2025-06-12 00:00:00+00:00", Close: 105929.0546875, Volume: 54843867968 },
  { Date: "2025-06-13 00:00:00+00:00", Close: 106090.96875, Volume: 69550440846 },
  { Date: "2025-06-14 00:00:00+00:00", Close: 105472.40625, Volume: 38007870453 },
  { Date: "2025-06-15 00:00:00+00:00", Close: 105552.0234375, Volume: 36744307742 },
  { Date: "2025-06-16 00:00:00+00:00", Close: 106796.7578125, Volume: 50366626945 },
  { Date: "2025-06-17 00:00:00+00:00", Close: 104601.1171875, Volume: 55964092176 },
  { Date: "2025-06-18 00:00:00+00:00", Close: 104883.328125, Volume: 47318089133 },
  { Date: "2025-06-19 00:00:00+00:00", Close: 104684.2890625, Volume: 37333806920 },
  { Date: "2025-06-20 00:00:00+00:00", Close: 103309.6015625, Volume: 50951862476 },
  { Date: "2025-06-21 00:00:00+00:00", Close: 101364.890625, Volume: 35429404672 }
];

export const inferenceData: InferenceDataPoint[] = [
  { date: "2025-04-23", token_price: 3.1051, energy_price: 0.5244, hash_price: 6.4949, gpu_profit: 483.1 },
  { date: "2025-04-24", token_price: 3.0562, energy_price: 0.5228, hash_price: 7.1193, gpu_profit: 442.2 },
  { date: "2025-04-25", token_price: 3.9104, energy_price: 0.7528, hash_price: 9.0423, gpu_profit: 146.4 },
  { date: "2025-04-26", token_price: 3.3442, energy_price: 0.8583, hash_price: 9.3818, gpu_profit: -947.3 },
  { date: "2025-04-27", token_price: 3.4221, energy_price: 0.6695, hash_price: 6.0452, gpu_profit: 74.6 },
  { date: "2025-04-28", token_price: 3.2869, energy_price: 0.8354, hash_price: 6.8831, gpu_profit: -890.1 },
  { date: "2025-04-29", token_price: 2.0339, energy_price: 0.7539, hash_price: 7.6892, gpu_profit: -1735.6 },
  { date: "2025-04-30", token_price: 3.0155, energy_price: 0.8881, hash_price: 6.1414, gpu_profit: -1425.0 },
  { date: "2025-05-01", token_price: 2.3933, energy_price: 0.798, hash_price: 7.6517, gpu_profit: -1596.7 },
  { date: "2025-05-02", token_price: 2.7066, energy_price: 0.5104, hash_price: 7.4224, gpu_profit: 154.6 },
  { date: "2025-05-03", token_price: 3.6878, energy_price: 0.8618, hash_price: 9.5835, gpu_profit: -621.2 },
  { date: "2025-05-04", token_price: 2.5606, energy_price: 0.714, hash_price: 9.4111, gpu_profit: -1009.4 },
  { date: "2025-05-05", token_price: 2.4589, energy_price: 0.5877, hash_price: 8.3173, gpu_profit: -479.6 },
  { date: "2025-05-06", token_price: 3.2212, energy_price: 0.7135, hash_price: 7.9491, gpu_profit: -346.3 },
  { date: "2025-05-07", token_price: 3.3851, energy_price: 0.7742, hash_price: 9.655, gpu_profit: -485.9 },
  { date: "2025-05-08", token_price: 2.0558, energy_price: 0.8694, hash_price: 8.9891, gpu_profit: -2291.2 },
  { date: "2025-05-09", token_price: 3.6104, energy_price: 0.5993, hash_price: 9.8832, gpu_profit: 613.9 },
  { date: "2025-05-10", token_price: 2.6346, energy_price: 0.8047, hash_price: 7.2046, gpu_profit: -1388.9 },
  { date: "2025-05-11", token_price: 3.1704, energy_price: 0.6557, hash_price: 9.2335, gpu_profit: -108.1 },
  { date: "2025-05-12", token_price: 2.47, energy_price: 0.6886, hash_price: 8.9701, gpu_profit: -973.0 },
  { date: "2025-05-13", token_price: 2.9437, energy_price: 0.8972, hash_price: 8.3342, gpu_profit: -1542.3 },
  { date: "2025-05-14", token_price: 3.7132, energy_price: 0.7044, hash_price: 6.8701, gpu_profit: 191.2 },
  { date: "2025-05-15", token_price: 2.0516, energy_price: 0.5951, hash_price: 8.9428, gpu_profit: -923.9 },
  { date: "2025-05-16", token_price: 3.5082, energy_price: 0.6167, hash_price: 8.1868, gpu_profit: 424.7 },
  { date: "2025-05-17", token_price: 3.8756, energy_price: 0.566, hash_price: 6.9464, gpu_profit: 1045.6 },
  { date: "2025-05-18", token_price: 3.5509, energy_price: 0.5655, hash_price: 7.2286, gpu_profit: 723.4 },
  { date: "2025-05-19", token_price: 3.4167, energy_price: 0.6329, hash_price: 6.5632, gpu_profit: 252.2 },
  { date: "2025-05-20", token_price: 3.7452, energy_price: 0.8613, hash_price: 9.0242, gpu_profit: -561.3 },
  { date: "2025-05-21", token_price: 2.6898, energy_price: 0.7706, hash_price: 8.5533, gpu_profit: -1163.2 },
  { date: "2025-05-22", token_price: 2.2316, energy_price: 0.5935, hash_price: 6.9874, gpu_profit: -735.9 },
  { date: "2025-05-23", token_price: 3.425, energy_price: 0.6711, hash_price: 6.107, gpu_profit: 69.5 },
  { date: "2025-05-24", token_price: 2.5605, energy_price: 0.8869, hash_price: 8.4722, gpu_profit: -1874.0 },
  { date: "2025-05-25", token_price: 2.1731, energy_price: 0.6976, hash_price: 8.1297, gpu_profit: -1314.9 },
  { date: "2025-05-26", token_price: 3.5024, energy_price: 0.5551, hash_price: 9.3339, gpu_profit: 726.9 },
  { date: "2025-05-27", token_price: 3.9573, energy_price: 0.7524, hash_price: 8.9965, gpu_profit: 195.3 },
  { date: "2025-05-28", token_price: 2.138, energy_price: 0.5657, hash_price: 9.9899, gpu_profit: -690.5 },
  { date: "2025-05-29", token_price: 2.091, energy_price: 0.8201, hash_price: 6.5751, gpu_profit: -2009.5 },
  { date: "2025-05-30", token_price: 3.5454, energy_price: 0.7039, hash_price: 7.0874, gpu_profit: 25.9 },
  { date: "2025-05-31", token_price: 3.0964, energy_price: 0.6704, hash_price: 7.2657, gpu_profit: -255.6 },
  { date: "2025-06-01", token_price: 2.7823, energy_price: 0.863, hash_price: 9.9872, gpu_profit: -1532.7 },
  { date: "2025-06-02", token_price: 2.1742, energy_price: 0.7032, hash_price: 6.4841, gpu_profit: -1341.8 },
  { date: "2025-06-03", token_price: 3.6861, energy_price: 0.8341, hash_price: 7.356, gpu_profit: -484.4 },
  { date: "2025-06-04", token_price: 2.5673, energy_price: 0.5531, hash_price: 8.143, gpu_profit: -198.2 },
  { date: "2025-06-05", token_price: 3.5302, energy_price: 0.8326, hash_price: 8.0365, gpu_profit: -632.8 },
  { date: "2025-06-06", token_price: 2.8218, energy_price: 0.7309, hash_price: 8.2467, gpu_profit: -832.7 },
  { date: "2025-06-07", token_price: 2.2854, energy_price: 0.8547, hash_price: 6.1502, gpu_profit: -1988.1 },
  { date: "2025-06-08", token_price: 3.294, energy_price: 0.5289, hash_price: 7.6574, gpu_profit: 649.5 },
  { date: "2025-06-09", token_price: 3.1269, energy_price: 0.6689, hash_price: 9.5183, gpu_profit: -217.6 },
  { date: "2025-06-10", token_price: 2.0716, energy_price: 0.7012, hash_price: 8.2975, gpu_profit: -1434.4 },
  { date: "2025-06-11", token_price: 3.0128, energy_price: 0.5822, hash_price: 9.8331, gpu_profit: 101.8 },
  { date: "2025-06-12", token_price: 3.612, energy_price: 0.6211, hash_price: 7.3802, gpu_profit: 506.5 },
  { date: "2025-06-13", token_price: 3.8214, energy_price: 0.6616, hash_price: 7.2713, gpu_profit: 513.4 },
  { date: "2025-06-14", token_price: 2.6166, energy_price: 0.8403, hash_price: 9.2162, gpu_profit: -1584.9 },
  { date: "2025-06-15", token_price: 2.8988, energy_price: 0.6193, hash_price: 8.3053, gpu_profit: -197.7 },
  { date: "2025-06-16", token_price: 3.9842, energy_price: 0.5432, hash_price: 9.2319, gpu_profit: 1268.2 },
  { date: "2025-06-17", token_price: 3.2423, energy_price: 0.7617, hash_price: 7.5453, gpu_profit: -566.2 },
  { date: "2025-06-18", token_price: 3.3236, energy_price: 0.516, hash_price: 8.7889, gpu_profit: 743.6 },
  { date: "2025-06-19", token_price: 3.9392, energy_price: 0.6016, hash_price: 6.2416, gpu_profit: 931.2 },
  { date: "2025-06-20", token_price: 3.1627, energy_price: 0.5354, hash_price: 7.4788, gpu_profit: 485.7 },
  { date: "2025-06-21", token_price: 3.0889, energy_price: 0.7725, hash_price: 6.6366, gpu_profit: -773.6 }
]; 