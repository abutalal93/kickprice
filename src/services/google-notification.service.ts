import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class GoogleNotificationService {

  mobilePlatform: any;
  mobileToken: any;

  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform
  ) { }

  async getToken() {

    if (this.platform.is('android')) {
      this.mobileToken = await this.firebaseNative.getToken();
      this.mobilePlatform = 'android'
      console.log('android token: ', this.mobileToken);
    }

    if (this.platform.is('ios')) {
      this.mobileToken = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
      this.mobilePlatform = 'ios'
      console.log('ios token: ', this.mobileToken);
    }

    return this.saveTokenToFirestore(this.mobileToken)
  }

  private saveTokenToFirestore(mobileToken) {
    if (!mobileToken) return;

    const devicesRef = this.afs.collection('devices')

    const docData = {
      mobileToken,
      userId: 'testUser',
    }

    return devicesRef.doc(mobileToken).set(docData)
  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()
  }
}
