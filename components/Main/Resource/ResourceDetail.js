import React from 'react'
import { View, Text, TouchableWithoutFeedback, FlatList, ScrollView, StyleSheet, Dimensions, Image } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { TextStyle, BookThumbWithDetail } from '../../basic'
import Animation from 'lottie-react-native'
import RNFetchBlob from 'rn-fetch-blob'
import { SharedElement } from 'react-navigation-shared-element'


const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        width,
        backgroundColor: '#1E152A'
    },
    scrollView: {
    },
    img: {
        height: 200,
        width: 120,
        borderRadius: 10,
        marginTop:50
    },
    name: {
        marginTop: 20,
        textAlign: 'center',
        paddingHorizontal: 10,
        textTransform:  'capitalize'
    },
    subCode: {
        backgroundColor: 'rgba(30,21,42,0.7)',
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        color: '#fff'
    },
    downloadContainer: {
        backgroundColor: '#1E152A',
        marginTop: 30,
        width: width - 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    whiteText: {
        color: '#FFF',
        fontFamily: 'SFProText-Regular',
        fontSize: 18
    },
    related: {
        color: '#1E152A',
        fontFamily: 'SFProText-Regular',
        fontSize: 16,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    flatlist: {
        minHeight: 200,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#FFF'
    }
})
const ResourceDetail = ({ route, navigation }) => {

    
    const { thumb, name, author, subCode, data, url, id } = route.params
    const dataList = data.filter(d => d.name !== name)

    const startDownload = async () => {
        console.log('Download started')
        let dir = RNFetchBlob.fs.dirs
        RNFetchBlob.config({
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mime: 'application/pdf',
                description: `Downloading ${name} `,
                title: 'Instudy'
            },
            fileCache: true,
            path: dir.DownloadDir + `${name.split(' ').join('-')}.pdf`
        }).fetch('GET', url).then(res => {
            console.log('file saved to', res)
        }).catch(e => {
            console.log(e)
        })

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <Feather name='x' size={24} color='#fff' />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <Feather name='bookmark' size={24} color='#fff' />
                </TouchableWithoutFeedback>
            </View>

            <ScrollView style={styles.scrollView}>
            <View style={{ ...StyleSheet.absoluteFillObject,backgroundColor: '#1E152A'}} />
                <View style={{ flex: 1, alignItems: 'center' , borderTopLeftRadius: 75, borderTopRightRadius: 75, backgroundColor: '#fff'}}>
                    
                    <SharedElement id={`${id}`}>
                        <Image style={styles.img} source={{ uri: thumb }} resizeMode='cover' />
                    </SharedElement>
                    <Text style={[TextStyle.heading, styles.name]}>{name}</Text>
                    <Text style={[TextStyle.description]}>{author}</Text>
                    <Text style={styles.subCode}>{subCode}</Text>
                    <TouchableWithoutFeedback onPress={() => startDownload()}>
                        <View style={styles.downloadContainer}>
                            <Text style={styles.whiteText}>Download</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>


                <Text style={styles.related}>Related Items</Text>
                <FlatList
                    data={dataList}
                    style={styles.flatlist}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={({ item }, i) => (
                        <BookThumbWithDetail key={i} {...item} navigation={navigation} variant='light' />
                    )}
                    ListEmptyComponent={() => (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Animation
                                style={{ height: 100, width: 100 }}
                                source={require('../../../assets/loader.json')}
                                progress={1}
                                autoPlay={true}
                                speed={1}
                                loop
                            />
                        </View>
                    )} />
            </ScrollView>
        </View>
    )
}


export default ResourceDetail
