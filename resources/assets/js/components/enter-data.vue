<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading"><h1>You're One Step Away...</h1></div>

                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label">ZIP code</label>
                                    <div class="inner-addon right-addon">
                                        <i class="glyphicon glyphicon-map-marker form-control-feedback"></i>
                                        <input class="form-control" type="text" v-on:change="changeZip" v-model="zipCode">
                                    </div>
                                </div>
                                <div class="alert alert-danger" v-if="zipError">
                                    {{ zipError }}
                                </div>
                                <div class="form-group">
                                    <label class="control-label">Purchase price</label>
                                    <div class="inner-addon left-addon">
                                        <i class="glyphicon glyphicon-usd form-control-feedback"></i>
                                        <input class="form-control" type="text" v-on:change="changeSum" v-model="price">
                                    </div>
                                </div>
                                <div class="alert alert-danger" v-if="priceError">
                                    {{ priceError }}
                                </div>
                                <div class="form-group">
                                    <label class="control-label">Down payment</label>
                                    <div class="form-group">
                                        <div class="inner-addon left-addon price-input">
                                            <i class="glyphicon glyphicon-usd form-control-feedback"></i>
                                            <input class="form-control" type="text" v-on:change="changePayment" v-model="payment">
                                        </div>
                                        <div class="inner-addon right-addon percent-input">
                                            <i class="percent-icon form-control-feedback">%</i>
                                            <input class="form-control" type="text" v-on:change="changePayment" v-model="paymentPercent">
                                        </div>
                                    </div>
                                </div>
                                <div class="alert alert-danger" v-if="paymentError">
                                    {{ paymentError }}
                                </div>
                                <div class="form-group">
                                    <label class="control-label">Credit score</label>
                                    <select class="form-control" type="text" v-model="credit">
                                        <option v-for="credit in credits">{{ credit }}</option>
                                    </select>
                                </div>
                                <div class="checkbox">
                                    <label><input type="checkbox" v-model="veteran">Military/Veteran?</label>
                                </div>
                                <div class="row" v-if="veteran">
                                    <div class="col-md-10 col-md-offset-2">
                                        <div class="checkbox">
                                            <label><input type="checkbox" v-model="prior">Prior VA loan?</label>
                                        </div>
                                        <div class="checkbox">
                                            <label><input type="checkbox" v-model="disabilities">VA disabilities?</label>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label">Type of service</label>
                                            <select class="form-control" type="text" v-model="serviceType">
                                                <option v-for="type in serviceTypes">{{ type }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label">Annual income</label>
                                    <div class="inner-addon left-addon">
                                        <i class="glyphicon glyphicon-usd form-control-feedback"></i>
                                        <input class="form-control" type="text" v-on:change="changeAnnual" v-model="annual">
                                    </div>
                                </div>
                                <div class="alert alert-danger" v-if="annualError">
                                    {{ annualError }}
                                </div>
                                <div class="form-group">
                                    <label class="control-label">Monthly debts</label>
                                    <div class="inner-addon left-addon">
                                        <i class="glyphicon glyphicon-usd form-control-feedback"></i>
                                        <input class="form-control" type="text" v-on:change="changeDebit" v-model="debit">
                                    </div>
                                </div>
                                <div class="alert alert-danger" v-if="debitError">
                                    {{ debitError }}
                                </div>
                                <div class="form-group">
                                    <label class="control-label">Property type</label>
                                    <select class="form-control" type="text" v-model="property">
                                        <option v-for="type in propertyTypes">{{ type }}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">How is home used?</label>
                                    <select class="form-control" type="text" v-model="homeUsed">
                                        <option v-for="type in homeUsedTypes">{{ type }}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">First-time buyer?</label>
                                    <select class="form-control" type="text" v-model="firstTimeBuyer">
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">New construction?</label>
                                    <select class="form-control" type="text" v-model="newConstruction">
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="checkbox">
                                    <label><input type="checkbox" v-model="bankruptcy">Filed bankruptcy?</label>
                                </div>
                                <div class="checkbox">
                                    <label><input type="checkbox" v-model="foreclosure">Had a foreclosure?</label>
                                </div>
                                <div class="checkbox">
                                    <label><input type="checkbox" v-model="employed">Self-employed?</label>
                                </div>
                                <div v-if="bankruptcy || foreclosure || employed">
                                    <div class="form-group">
                                        <label class="control-label">Assets</label>
                                        <div class="inner-addon left-addon">
                                            <i class="glyphicon glyphicon-usd form-control-feedback"></i>
                                            <input class="form-control" type="text" v-on:change="changeAssets" v-model="assets">
                                        </div>
                                    </div>
                                    <div class="alert alert-danger" v-if="assetsError">
                                        {{ assetsError }}
                                    </div>
                                </div>
                                <p><b>DESIRED LOAN PROGRAMS?</b></p>
                                <div class="checkbox">
                                    <label><input type="checkbox" v-model="thirtyYear">30 year fixed</label>
                                </div>
                                <div class="checkbox">
                                    <label><input type="checkbox" v-model="twentyYear">20 year fixed</label>
                                </div>
                                <div class="checkbox">
                                    <label><input type="checkbox" v-model="fifteenYear">15 year fixed</label>
                                </div>
                                <div class="checkbox">
                                    <label><input type="checkbox" v-model="tenYear">10 year fixed</label>
                                </div>
                                <div class="checkbox">
                                    <label><input type="checkbox" v-model="sevenARM">7/1 ARM</label>
                                </div>
                                <div class="checkbox">
                                    <label><input type="checkbox" v-model="fiveARM">5/1 ARM</label>
                                </div>
                                <div class="checkbox">
                                    <label><input type="checkbox" v-model="threeARM">3/1 ARM</label>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body text-right">
                            <button class="btn btn-default" @click="confirm">Confirm Alert</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    mounted() {
//      console.log('Component mounted.')
    },
    data() {
      return {
        price: '300,000',
        priceError: '',
        zipCode: '89521',
        zipError: '',
        payment: '60,000',
        paymentPercent: '20',
        paymentError: '',
        credits: ['760 and above', '740-759', '720-739', '700-719', '680-699', '660-679', '640-659', '620-639', '600-619', '560-599', '300-559'],
        credit: '720-739',
        veteran: false,
        prior: false,
        disabilities: false,
        serviceTypes: ['Regular Military', 'Reserves', 'National Guard', 'Spouse of regular military', 'Spouse of reserve military'],
        serviceType: 'Regular Military',
        annual: '70,000',
        annualError: '',
        debit: '0',
        debitError: '',
        propertyTypes: ['Single family home', 'Townhouse', 'Condo - 4 or fewer stories', 'Condo - 5+ stories', 'Cooperative', 'Mobile or manufactured', 'Modular', 'Leasehold'],
        property: 'Single family home',
        homeUsedTypes: ['Primary residence', 'Secondary / vacation', 'Investment / rental'],
        homeUsed: 'Primary residence',
        firstTimeBuyer: 0,
        newConstruction: 0,
        bankruptcy: false,
        foreclosure: false,
        employed: false,
        assets: 0,
        assetsError: '',
        thirtyYear: true,
        twentyYear: false,
        fifteenYear: true,
        tenYear: false,
        sevenARM: false,
        fiveARM: true,
        threeARM: false,
        hasErrors: false
      }
    },
    methods: {
      saveEmail() {
        console.log(this.email);
        this.$emit('datasave');
      },
      changeZip() {
        if (isNaN(this.zipCode)) {
          this.zipError = 'Invalid ZIP code';
        } else {
          this.zipError = '';
        }
      },
      changeSum() {
        let newPrice = this.price.replace(/,/g, '');
        if (isNaN(newPrice)) {
          this.priceError = 'Purchase price must be between $5,000 and $200,000,000';
        } else {
          this.priceError = '';
          this.price = toMoneyFormat(this.price);
        }
      },
      changePayment() {
        let newPayment = this.payment.replace(/,/g, '');
        if (isNaN(this.paymentPercent) || isNaN(newPayment)) {
          this.paymentError = 'Down payment must be between $0 and $200,000,000';
        } else {
          this.paymentError = '';
          if (this.paymentPercent > 100) {
            this.paymentPercent = 100;
          }
          this.payment = toMoneyFormat(this.payment);
        }
      },
      changeAnnual() {
        let newAnnual = this.annual.replace(/,/g, '');
        if (isNaN(newAnnual)) {
          this.annualError = 'Annual income must be between $0 and $10,000,000';
        } else {
          this.annualError = '';
          this.annual = toMoneyFormat(this.annual);
        }
      },
      changeDebit() {
        let newDebit = this.debit.replace(/,/g, '');
        if (isNaN(newDebit)) {
          this.debitError = 'Monthly debts must be between $0 and $200,000,000';
        } else {
          this.debitError = '';
          this.debit = toMoneyFormat(this.debit);
        }
      },
      changeAssets() {
        let newAssets = this.assets.replace(/,/g, '');
        if (isNaN(newAssets)) {
          this.assetsError = 'Assets must be between $0 and $200,000,000';
        } else {
          this.assetsError = '';
          this.assets = toMoneyFormat(this.assets);
        }
      },
      confirm() {
        if (this.priceError
          || this.zipError
          || this.paymentError
          || this.annualError
          || this.debitError
          || ((this.bankruptcy || this.foreclosure || this.employed) && this.assetsError))
        {
          this.hasErrors = 'Some field have incorrect value.';
        } else {
          this.hasErrors = '';
          this.$root.$data.price = this.price;
          this.$root.$data.zipCode = this.zipCode;
          this.$root.$data.payment = this.payment;
          this.$root.$data.paymentPercent = this.paymentPercent;
          this.$root.$data.credit = this.credit;
          this.$root.$data.veteran = this.veteran;
          this.$root.$data.prior = this.prior;
          this.$root.$data.disabilities = this.disabilities;
          this.$root.$data.serviceType = this.serviceType;
          this.$root.$data.annual = this.annual;
          this.$root.$data.debit = this.debit;
          this.$root.$data.property = this.property;
          this.$root.$data.homeUsed = this.homeUsed;
          this.$root.$data.firstTimeBuyer = !!this.firstTimeBuyer;
          this.$root.$data.newConstruction = !!this.newConstruction;
          this.$root.$data.bankruptcy = this.bankruptcy;
          this.$root.$data.foreclosure = this.foreclosure;
          this.$root.$data.employed = this.employed;
          this.$root.$data.assets = this.assets;
          this.$root.$data.thirtyYear = this.thirtyYear;
          this.$root.$data.twentyYear = this.twentyYear;
          this.$root.$data.fifteenYear = this.fifteenYear;
          this.$root.$data.tenYear = this.tenYear;
          this.$root.$data.sevenARM = this.sevenARM;
          this.$root.$data.fiveARM = this.fiveARM;
          this.$root.$data.threeARM = this.threeARM;
          this.$emit('datasave');
        }
      }
    }
  }

  function toMoneyFormat(value) {
    return parseInt(value.replace(/,/g, ''))
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
</script>
