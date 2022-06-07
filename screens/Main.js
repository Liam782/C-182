import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    Platform
} from 'react-native';

import * as Permissions from "expo-permissions";

import * as FaceDetector from 'expo-face-detector';
import { Camera } from 'expo-camera';

import Filter1 from './Filter1'
//import Filter2 from './Filter2'

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            faces: []
        }
        this.onCameraPermission = this.onCameraPermission.bind(this)
        this.onFacesDetected = this.onFacesDetected.bind(this)
        this.onFaceDetectionError = this.onFaceDetectionError.bind(this)
    }

    componentDidMount() {
        Permissions
            .askAsync(Permissions.CAMERA)
            .then(this.onCameraPermission)
    }

    onCameraPermission({ status }) {
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    onFacesDetected({ faces }) {
        this.setState({ faces: faces })
    }

    onFaceDetectionError(error) {
        console.log(error)
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />
        }
        if (hasCameraPermission === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.headingContainer}>
                    <Text style={styles.titleText}>FRAPP</Text>
                </View>
                <View style={styles.cameraStyle}>
                    <Camera
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.FaceDetectorMode.fast,
                            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications: FaceDetector.FaceDetectorClassifications.all,
                        }}

                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectionError={this.onFacesDetectionError}
                    />
                    {
                        this.state.faces.map(face => {
                            return <Filter1 key={face.faceID} face={face} />
                        })
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30
    },
    cameraStyle: {
        flex: 0.65
    }
});



/*import React from 'react';
import {Camera} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as Permissions from 'expo-permissions';
import {View, Text, StyleSheet, SafeAreaView, StatusBar, Platform} from 'react-native'

import Filter1 from './Filter1';

export default class Main extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            hasCameraPermissions: null,
            faces: []
        }
    }

    componentDidMount(){
        Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermissions)
    }

    onCameraPermissions = (status) => {
        this.setState({hasCameraPermissions: status.status === "granted"})
    }

    onFaceDetected = (faces) => {
        this.setState({faces: faces})
    }

    onFaceDetectedError = (error) => {
        console.log(error)
    }

    render(){
        const {hasCameraPermissions} = this.state
        if(hasCameraPermissions === null){
            return <View/>
        }

        if(hasCameraPermissions === false){
            return (<View style = {{flex: 1}}>
                <Text>Need Camera Permissions</Text>
            </View>)
        }

        return(
            <View style = {{flex: 1}}>
                <Text style = {{fontSize: 30}}>FRAPP</Text>

                <View style = {{flex: 0.6}}>
                    <Camera 
                        style = {{flex: 1}}
                        type = {Camera.Constants.Type.front}

                        faceDetectorSettings = {{
                            mode: FaceDetector.FaceDetectorMode.fast,
                            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications: FaceDetector.FaceDetectorClassifications.all,
                        }}

                        onFaceDetected = {this.onFaceDetected}
                        onFaceDetectedError = {this.onFaceDetectedError}
                    />{
                       // console.log(this.state.faces)
                        this.state.faces.map(face => {
                        return <Filter1 key = {face.faceID} face = {face}/>
                    })}
                </View>
            </View>
        );
    }
}*/