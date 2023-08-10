import numpy as np
import json
from flask import Flask, request, jsonify, render_template
import pandas as pd
import numpy as np
import pvlib

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/test')
def test():
    return jsonify({
        'result': 'abvdcdsa'
    })

@app.route('/abc')
def abc():
    return 'abc'

@app.route('/about')
def about():
   return render_template('about.html')

@app.route('/contact')
def contact():
   return render_template('contact.html')

@app.route('/index')
def index():
   return render_template('index.html')

@app.route('/map')
def map():
   return render_template('map.html')

@app.route('/nav')
def nav():
   return render_template('nav.html')

@app.route('/tech')
def tech():
   return render_template('tech.html')

@app.route('/some')
def home():
   return render_template('some.html')


@app.route('/clear_sky', methods=['POST'])
def clear_sky():
    data = request.get_json()
    capacity = data['input_variable']
    latitude = -33.8878872
    longitude = 151.2007315
    start_date = '2020-01-01'
    end_date = '2020-01-02'

    location = pvlib.location.Location(latitude, longitude, tz='Australia/Sydney')

    times = pd.date_range(start=start_date, end=end_date, freq='1H', tz='Australia/Sydney')
    solpos = location.get_solarposition(times=times)
    dni_extra = pvlib.irradiance.get_extra_radiation(times)
    airmass = pvlib.atmosphere.get_relative_airmass(solpos['apparent_zenith'])
    pressure = pvlib.atmosphere.alt2pres(location.altitude)
    am_abs = pvlib.atmosphere.get_absolute_airmass(airmass, pressure)
    tl = pvlib.clearsky.lookup_linke_turbidity(times, latitude, longitude)

    solis_clearsky = pvlib.clearsky.simplified_solis(solpos['apparent_zenith'], am_abs, tl)
    cs = location.get_clearsky(times, model='simplified_solis')

    capacity = float(capacity)

    system = pvlib.pvsystem.PVSystem(surface_tilt=30, surface_azimuth=180,
                                     module_parameters={'pdc0': capacity, 'gamma_pdc': -0.004},
                                     inverter_parameters={'pdc0': capacity},
                                     modules_per_string=1, strings_per_inverter=1,
                                     temperature_model_parameters={'a': -3.56, 'b': -0.075, 'deltaT': 3})
    mc = pvlib.modelchain.ModelChain(system, location, spectral_model='no_loss', aoi_model='no_loss')

    mc.run_model(solis_clearsky)

    # Replace NaN values in the 'ac' column with 0
    
    #mc.ac.fillna(0, inplace=True)

    df = pd.DataFrame(mc.ac).to_dict('records')

    return jsonify({
        'result': [record for record in df]
    })


@app.route('/process', methods=['POST'])
def process():
    data = request.get_json()
    input_variable = data['input_variable']
    # 받은 input_variable 값을 사용하여 원하는 작업 수행 (여기서는 간단히 문자열을 변환하여 리턴)
    result = process_data(input_variable)
    return jsonify({'result': result})

def process_data(input_variable):
    # 원하는 작업을 수행하고 결과를 리턴하는 함수
    return f'입력된 변수 값: {input_variable}'



if __name__ == '__main__':
    app.run(debug = True, port=7000)