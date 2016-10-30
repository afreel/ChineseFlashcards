import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import Swiper from 'react-native-swiper';

import AppText from './AppText.js';
import ChineseText from './ChineseText.js';
import BigButton from './BigButton.js';

class VocabCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.vocabCard}>
        <View>
          <AppText style={styles.pinyin}>{this.props.pinyin}</AppText>
        </View>
        <View>
          <ChineseText style={styles.vocab}>{this.props.name}</ChineseText>
        </View>
        <View>
          <AppText style={styles.pos}>[{this.props.pos}]</AppText>
        </View>
        <View>
          <AppText style={styles.definition}>{this.props.definition}</AppText>
        </View>
      </View>
    );
  }

}

export default class VocabNavigator extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let vocabCards = this.props.vocabulary.map((vocab, index) =>
      <VocabCard
        key={index}
        name={vocab['name']}
        pinyin={vocab['pinyin']}
        definition={vocab['definition']}
        pos={vocab['pos']}
      />
    );
    return (
      <Swiper style={styles.swiper} showsButtons={true} index={this.props.vocabIndex} loop={false} showsPagination={false}>
        {vocabCards}
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  swiper: {
  },
  vocabCard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  pinyin: {
    fontSize: 40,
  },
  vocab: {
    fontSize: 70,
    color: '#9B59B6'
  },
  pos: {
    fontSize: 25,
    color: '#BDC3C7'
  },
  definition: {
    fontSize: 25,
  }
});

/** The below Navigator works, but now using Swiper to handle swipe events
// export default class VocabNavigator extends Component {
//
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     var initialVocabIndex = this.props.vocabIndex;
//     return (
//       <Navigator
//         initialRoute={{type: 'SwipeForward', vocabIndex: initialVocabIndex}}
//
//         renderScene={ (route, navigator) =>
//           <VocabCard
//             name={this.props.vocabulary[route.vocabIndex]['name']}
//
//             onForward={ () => {
//               if (route.vocabIndex < this.props.vocabulary.length - 1) {
//                 navigator.push({
//                   type: 'SwipeForward',
//                   vocabIndex: route.vocabIndex + 1
//                 });
//               }
//             }}
//
//             onBack={ () => {
//               if (route.vocabIndex > 0) {
//                 navigator.push({
//                   type: 'SwipeBack',
//                   vocabIndex: route.vocabIndex - 1
//                 });
//               }
//             }}
//           />
//         }
//
//         configureScene={(route, routeStack) => {
//           if (route.type == 'SwipeForward') {
//             return Navigator.SceneConfigs.HorizontalSwipeJump
//           } else if (route.type == 'SwipeBack') {
//             return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
//           }
//         }}
//       />
//     )
//   }
// }

/** It may be possible to Implement VocabNavigator with a ScrollView,
  * however the problem is forcing only one item per page
**/
// export default class VocabNavigator extends Component {
//
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     let vocabCards = this.props.vocabulary.map((vocab, index) =>
//       <VocabCard key={index} name={vocab['name']} />
//     );
//     return (
//       <ScrollView
//         horizontal={true}
//         contentContainerStyle={styles.scrollContentContainer}
//       >
//         {vocabCards}
//       </ScrollView>
//     );
//   }
//
// }
