import { Game, type Hour, Weather } from './main';

export const LOOP_TIMES: Record<Game, Record<Weather, Record<Hour, { end: string; start: string }> | undefined>> = {
    [Game.AC]: {
        [Weather.Raining]: undefined,
        [Weather.Snowing]: {
            '00': { end: '125.628', start: '000.000' },
            '01': { end: '133.740', start: '003.925' },
            '02': { end: '175.674', start: '000.000' },
            '03': { end: '177.770', start: '000.416' },
            '04': { end: '138.628', start: '000.000' },
            '05': { end: '186.119', start: '000.000' },
            '06': { end: '165.777', start: '000.396' },
            '07': { end: '137.524', start: '000.000' },
            '08': { end: '142.308', start: '000.000' },
            '09': { end: '130.613', start: '002.700' },
            10: { end: '116.657', start: '000.000' },
            11: { end: '142.220', start: '000.000' },
            12: { end: '109.480', start: '000.000' },
            13: { end: '144.945', start: '000.000' },
            14: { end: '130.274', start: '000.000' },
            15: { end: '082.985', start: '000.940' },
            16: { end: '130.280', start: '000.000' },
            17: { end: '136.090', start: '010.460' },
            18: { end: '134.920', start: '000.000' },
            19: { end: '127.740', start: '000.000' },
            20: { end: '120.780', start: '000.000' },
            21: { end: '153.528', start: '000.000' },
            22: { end: '101.750', start: '001.240' },
            23: { end: '080.386', start: '000.000' },
        },
        [Weather.Sunny]: {
            '00': { end: '125.628', start: '000.000' },
            '01': { end: '133.740', start: '003.925' },
            '02': { end: '175.674', start: '000.000' },
            '03': { end: '177.770', start: '000.416' },
            '04': { end: '138.628', start: '000.000' },
            '05': { end: '186.119', start: '000.000' },
            '06': { end: '165.777', start: '000.396' },
            '07': { end: '137.524', start: '000.000' },
            '08': { end: '142.308', start: '000.000' },
            '09': { end: '130.613', start: '002.700' },
            10: { end: '116.657', start: '000.000' },
            11: { end: '142.220', start: '000.000' },
            12: { end: '109.480', start: '000.000' },
            13: { end: '144.945', start: '000.000' },
            14: { end: '130.274', start: '000.000' },
            15: { end: '082.985', start: '000.940' },
            16: { end: '130.280', start: '000.000' },
            17: { end: '136.090', start: '010.460' },
            18: { end: '134.920', start: '000.000' },
            19: { end: '127.740', start: '000.000' },
            20: { end: '120.780', start: '000.000' },
            21: { end: '153.528', start: '000.000' },
            22: { end: '101.750', start: '001.240' },
            23: { end: '080.386', start: '000.000' },
        },
    },
    [Game.NH]: {
        [Weather.Raining]: {
            '00': { end: '079.976', start: '010.209' },
            '01': { end: '095.466', start: '011.466' },
            '02': { end: '109.397', start: '007.044' },
            '03': { end: '060.943', start: '010.417' },
            '04': { end: '072.008', start: '017.151' },
            '05': { end: '120.000', start: '024.000' },
            '06': { end: '076.205', start: '014.583' },
            '07': { end: '083.560', start: '008.560' },
            '08': { end: '079.261', start: '008.547' },
            '09': { end: '061.273', start: '002.489' },
            10: { end: '081.977', start: '012.643' },
            11: { end: '089.811', start: '010.421' },
            12: { end: '073.079', start: '007.861' },
            13: { end: '070.716', start: '015.332' },
            14: { end: '092.089', start: '008.368' },
            15: { end: '066.110', start: '009.268' },
            16: { end: '076.177', start: '025.651' },
            17: { end: '110.129', start: '011.498' },
            18: { end: '068.297', start: '014.167' },
            19: { end: '116.762', start: '012.978' },
            20: { end: '063.167', start: '009.167' },
            21: { end: '070.742', start: '014.446' },
            22: { end: '073.356', start: '006.690' },
            23: { end: '082.208', start: '010.208' },
        },
        [Weather.Snowing]: {
            '00': { end: '079.976', start: '010.209' },
            '01': { end: '100.002', start: '016.002' },
            '02': { end: '109.397', start: '007.044' },
            '03': { end: '060.943', start: '010.417' },
            '04': { end: '072.025', start: '017.168' },
            '05': { end: '120.000', start: '024.000' },
            '06': { end: '076.203', start: '014.581' },
            '07': { end: '083.560', start: '008.560' },
            '08': { end: '079.261', start: '008.547' },
            '09': { end: '061.273', start: '002.489' },
            10: { end: '081.981', start: '012.648' },
            11: { end: '089.808', start: '010.424' },
            12: { end: '073.079', start: '007.861' },
            13: { end: '070.716', start: '015.332' },
            14: { end: '092.089', start: '008.368' },
            15: { end: '066.113', start: '009.271' },
            16: { end: '078.955', start: '028.429' },
            17: { end: '110.129', start: '011.498' },
            18: { end: '068.297', start: '014.167' },
            19: { end: '116.762', start: '012.978' },
            20: { end: '063.167', start: '009.167' },
            21: { end: '070.748', start: '014.452' },
            22: { end: '083.519', start: '016.852' },
            23: { end: '082.208', start: '010.208' },
        },
        [Weather.Sunny]: {
            '00': { end: '079.976', start: '010.209' },
            '01': { end: '095.490', start: '011.490' },
            '02': { end: '109.397', start: '007.044' },
            '03': { end: '060.943', start: '010.417' },
            '04': { end: '072.010', start: '017.152' },
            '05': { end: '120.000', start: '024.000' },
            '06': { end: '076.204', start: '014.583' },
            '07': { end: '083.560', start: '008.560' },
            '08': { end: '079.261', start: '008.547' },
            '09': { end: '061.273', start: '002.489' },
            10: { end: '081.975', start: '012.642' },
            11: { end: '089.543', start: '010.159' },
            12: { end: '073.079', start: '007.861' },
            13: { end: '070.717', start: '015.332' },
            14: { end: '092.089', start: '008.368' },
            15: { end: '066.113', start: '009.271' },
            16: { end: '076.180', start: '025.654' },
            17: { end: '110.129', start: '011.498' },
            18: { end: '068.300', start: '014.169' },
            19: { end: '116.762', start: '012.978' },
            20: { end: '061.084', start: '007.084' },
            21: { end: '068.173', start: '011.875' },
            22: { end: '070.174', start: '003.503' },
            23: { end: '082.211', start: '010.211' },
        },
    },
    [Game.NL]: {
        [Weather.Raining]: {
            '00': { end: '078.980', start: '000.000' },
            '01': { end: '114.630', start: '000.000' },
            '02': { end: '167.000', start: '000.000' },
            '03': { end: '082.000', start: '000.000' },
            '04': { end: '109.080', start: '004.370' },
            '05': { end: '108.000', start: '000.000' },
            '06': { end: '077.660', start: '003.090' },
            '07': { end: '093.850', start: '004.500' },
            '08': { end: '086.410', start: '000.020' },
            '09': { end: '057.630', start: '000.010' },
            10: { end: '086.900', start: '007.770' },
            11: { end: '083.990', start: '000.000' },
            12: { end: '086.510', start: '000.790' },
            13: { end: '087.110', start: '007.100' },
            14: { end: '080.810', start: '000.000' },
            15: { end: '059.885', start: '000.000' },
            16: { end: '092.670', start: '002.690' },
            17: { end: '142.970', start: '009.395' },
            18: { end: '089.665', start: '000.000' },
            19: { end: '091.780', start: '007.115' },
            20: { end: '085.670', start: '002.165' },
            21: { end: '093.630', start: '008.290' },
            22: { end: '073.440', start: '000.000' },
            23: { end: '124.005', start: '000.000' },
        },
        [Weather.Snowing]: {
            '00': { end: '078.980', start: '000.000' },
            '01': { end: '114.660', start: '000.000' },
            '02': { end: '167.000', start: '000.000' },
            '03': { end: '082.000', start: '000.000' },
            '04': { end: '109.080', start: '004.370' },
            '05': { end: '108.000', start: '000.000' },
            '06': { end: '077.660', start: '003.090' },
            '07': { end: '097.440', start: '008.100' },
            '08': { end: '086.410', start: '000.020' },
            '09': { end: '057.630', start: '000.010' },
            10: { end: '086.900', start: '007.770' },
            11: { end: '083.990', start: '000.000' },
            12: { end: '086.510', start: '000.790' },
            13: { end: '087.110', start: '007.100' },
            14: { end: '080.810', start: '000.000' },
            15: { end: '059.885', start: '000.000' },
            16: { end: '092.670', start: '002.690' },
            17: { end: '142.970', start: '009.395' },
            18: { end: '089.665', start: '000.000' },
            19: { end: '091.780', start: '007.075' },
            20: { end: '085.670', start: '002.165' },
            21: { end: '093.630', start: '008.290' },
            22: { end: '073.440', start: '000.000' },
            23: { end: '124.100', start: '000.000' },
        },
        [Weather.Sunny]: {
            '00': { end: '078.980', start: '000.000' },
            '01': { end: '114.630', start: '000.000' },
            '02': { end: '167.000', start: '000.000' },
            '03': { end: '082.000', start: '000.000' },
            '04': { end: '109.080', start: '004.370' },
            '05': { end: '108.000', start: '000.000' },
            '06': { end: '077.660', start: '003.090' },
            '07': { end: '097.440', start: '008.100' },
            '08': { end: '086.410', start: '000.020' },
            '09': { end: '057.630', start: '000.010' },
            10: { end: '082.045', start: '002.875' },
            11: { end: '083.990', start: '000.000' },
            12: { end: '086.510', start: '000.790' },
            13: { end: '087.110', start: '007.100' },
            14: { end: '093.550', start: '008.830' },
            15: { end: '059.885', start: '000.000' },
            16: { end: '092.670', start: '002.690' },
            17: { end: '142.970', start: '009.405' },
            18: { end: '089.665', start: '000.000' },
            19: { end: '091.780', start: '007.075' },
            20: { end: '085.670', start: '002.165' },
            21: { end: '099.015', start: '003.040' },
            22: { end: '073.440', start: '000.000' },
            23: { end: '124.005', start: '000.000' },
        },
    },
    [Game.WW]: {
        [Weather.Raining]: {
            '00': { end: '108.830', start: '010.370' },
            '01': { end: '103.780', start: '012.970' },
            '02': { end: '144.775', start: '007.800' },
            '03': { end: '092.120', start: '012.118' },
            '04': { end: '051.225', start: '004.405' },
            '05': { end: '147.685', start: '000.000' },
            '06': { end: '078.985', start: '000.610' },
            '07': { end: '084.650', start: '004.670' },
            '08': { end: '053.335', start: '000.000' },
            '09': { end: '068.495', start: '000.490' },
            10: { end: '081.380', start: '003.540' },
            11: { end: '102.765', start: '000.620' },
            12: { end: '170.660', start: '000.000' },
            13: { end: '101.630', start: '005.615' },
            14: { end: '119.985', start: '013.330' },
            15: { end: '073.132', start: '000.000' },
            16: { end: '100.520', start: '008.620' },
            17: { end: '079.990', start: '000.000' },
            18: { end: '109.850', start: '001.850' },
            19: { end: '091.300', start: '001.300' },
            20: { end: '149.620', start: '001.885' },
            21: { end: '097.860', start: '001.840' },
            22: { end: '181.600', start: '000.000' },
            23: { end: '151.590', start: '000.000' },
        },
        [Weather.Snowing]: {
            '00': { end: '108.830', start: '010.370' },
            '01': { end: '103.780', start: '012.970' },
            '02': { end: '144.785', start: '007.800' },
            '03': { end: '092.120', start: '012.118' },
            '04': { end: '051.225', start: '004.405' },
            '05': { end: '147.695', start: '000.000' },
            '06': { end: '078.985', start: '000.610' },
            '07': { end: '084.670', start: '004.670' },
            '08': { end: '053.335', start: '000.000' },
            '09': { end: '068.495', start: '000.490' },
            10: { end: '081.380', start: '003.540' },
            11: { end: '102.765', start: '000.620' },
            12: { end: '170.695', start: '000.000' },
            13: { end: '101.997', start: '005.990' },
            14: { end: '119.985', start: '013.330' },
            15: { end: '073.132', start: '000.000' },
            16: { end: '100.520', start: '008.620' },
            17: { end: '079.990', start: '000.000' },
            18: { end: '109.850', start: '001.850' },
            19: { end: '091.300', start: '001.300' },
            20: { end: '149.620', start: '001.885' },
            21: { end: '097.860', start: '001.840' },
            22: { end: '181.600', start: '000.000' },
            23: { end: '151.590', start: '000.000' },
        },
        [Weather.Sunny]: {
            '00': { end: '108.830', start: '010.370' },
            '01': { end: '103.780', start: '012.970' },
            '02': { end: '144.785', start: '007.800' },
            '03': { end: '092.120', start: '012.118' },
            '04': { end: '051.225', start: '004.405' },
            '05': { end: '147.695', start: '000.000' },
            '06': { end: '078.985', start: '000.610' },
            '07': { end: '084.670', start: '004.670' },
            '08': { end: '053.335', start: '000.000' },
            '09': { end: '068.495', start: '000.490' },
            10: { end: '081.380', start: '003.540' },
            11: { end: '102.765', start: '000.620' },
            12: { end: '170.660', start: '000.000' },
            13: { end: '101.630', start: '005.615' },
            14: { end: '119.985', start: '013.330' },
            15: { end: '073.132', start: '000.000' },
            16: { end: '100.520', start: '008.620' },
            17: { end: '079.990', start: '000.000' },
            18: { end: '109.850', start: '001.850' },
            19: { end: '091.300', start: '001.300' },
            20: { end: '149.620', start: '001.885' },
            21: { end: '097.860', start: '001.840' },
            22: { end: '181.600', start: '000.000' },
            23: { end: '151.590', start: '000.000' },
        },
    },
};
