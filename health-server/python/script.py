
#SCRIPT FOR PREDICTIONS
import sys
import pickle
import numpy as np
import pandas as pd
from datetime import date 
chd=pickle.load(open('/home/praju/Desktop/Inframind/inframind/health-server/python/picklechdfinal.pkl','rb'))
Glucose , Insulin  , BMI  , bYear ,totChol, sysBP, diaBP, heartRate ,oxy,respiration,Gender =sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5],sys.argv[6],sys.argv[7],sys.argv[8],sys.argv[9],sys.argv[10],sys.argv[11]
Glucose , Insulin  , BMI  , bYear ,totChol, sysBP, diaBP, heartRate ,oxy,respiration=int(Glucose) , int(Insulin)  , int(BMI)  , int(bYear) ,int(totChol), int(sysBP), int(diaBP),int(heartRate) ,int(oxy),int(respiration)
today = date.today() 
Age = today.year - bYear
if(Gender=='male'):
    gender=1
if(Gender=='female'):
    gender=0
 
diabetes=pickle.load(open('/home/praju/Desktop/Inframind/inframind/health-server/python/pdia.pkl','rb'))	

predictions=[]
#predicting chd using pickle file
def predict_chd():

	dict1 = {'0':Age, '1':sysBP, '2':diaBP, '3':totChol,'4':heartRate,'5':gender}

	df_input1 = pd.DataFrame(dict1,index=[0],columns=["0","1","2","3","4","5"])

	f1=chd.predict(df_input1)

	return predictions.append(f1[0])

#predicting diabetes using pickle file
def predict_dia():

    dict2 = {'0':Glucose , '1':Insulin  , '2':BMI  , '3':Age  }

    df_input2 = pd.DataFrame(dict2,index=[0],columns=["0","1","2","3"])

    f2=diabetes.predict(df_input2)

    return predictions.append(f2[0])
    
#Other machine learning models are in progress
#Currently using programming logic for predicting diseases
def  predict_prediabetes():
    if Glucose<199 and Glucose>140:
        predictions.append(1)

    else:
        predictions.append(0)

def predict_hypoximea():
    if oxy<95:
    	predictions.append(1)

         
    elif oxy<=100 and oxy>=95:
    	predictions.append(0)  
    else:
        predictions.append(0)  
         
      
def predict_asthama():
    if oxy >=92 and oxy<=95:
        if oxy >=92 and oxy<=95:
            if respiration >=20 and respiration<=30:
                predictions.append(1)
            else:
                predictions.append(0)
        else:
            predictions.append(0)
    else:
        predictions.append(0)

def predict_bronchi():
    if respiration>19:
        predictions.append(1)

    else:
        predictions.append(0)


#get our data as an array from read_in()

predict_dia()
predict_prediabetes()
predict_hypoximea()
predict_asthama()
predict_bronchi()
predict_chd()

print(predictions)




