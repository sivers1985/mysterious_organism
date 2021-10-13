// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      let randomNum = Math.floor(Math.random() * this.dna.length + 1);
      let randomBase = this.dna[randomNum];
      switch(randomBase) {
        case 'A':
          this.dna[randomNum] = ['T', 'C', 'G'][Math.floor(Math.random() * 3)];
          break;
        case 'T':
          this.dna[randomNum] = ['A', 'C', 'G'][Math.floor(Math.random() * 3)];
          break;
        case 'C':
          this.dna[randomNum] = ['A', 'T', 'G'][Math.floor(Math.random() * 3)];
          break;
        case 'G':
          this.dna[randomNum] = ['A', 'T', 'C'][Math.floor(Math.random() * 3)];
          break;
      }
      return this.dna;
    },
    compareDNA(pAequor) {
      let sameBase = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          sameBase += 1;
        }
      }
      let percentInCommon = (sameBase / this.dna.length * 100).toFixed(2)
      console.log(`P. Aequor specimen ${this.specimenNum} and P. Aequor specimen ${pAequor.specimenNum} have ${percentInCommon}% dna in common.`);
    },
    willLikelySurvive() {
      let cOrG = 0;
      for (let base of this.dna) {
        if (base === 'C' || base === 'G') {
          cOrG += 1;
        }
      }
      return cOrG / this.dna.length >= 0.6;
    },
    complementStrand() {
      let complement = [];
      for (let i = 0; i < this.dna.length; i++) {
        switch(this.dna[i]) {
          case 'A':
            complement.push('T');
            break;
          case 'T':
            complement.push('A');
            break;
          case 'C':
            complement.push('G');
            break;
          case 'G':
            complement.push('C');
            break;
        }
      }
      return complement;
    }
  }
};

const createSurvivableStrands = (numberOfStrands) => {
  let arr = [];
  for (let i = 1; i <= numberOfStrands; i++) {
    let strandObj = pAequorFactory(i, mockUpStrand());
    while (!strandObj.willLikelySurvive()) {
      strandObj.mutate();
    }
    arr.push(strandObj);
  }
  return arr;
};

const findMostRelatedStrands = arr => {
  let compareArr = [];
  let percentArr = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] !== arr[j]) {
        // console.log(arr[i].dna);
        let sameBase = 0;
        for (let x = 0; x < arr[i].dna.length; x++) {
          if (arr[i].dna[x] === arr[j].dna[x]) {
            sameBase += 1;
          }
        }
        let percentInCommon = (sameBase / arr[i].dna.length * 100).toFixed(2);
        // console.log(percentInCommon);
        compareArr.push({
          specimen1: arr[i],
          specimen2: arr[j],
          percentInCommon
        });
        percentArr.push(percentInCommon);
      }
    }
  }
  // console.log(compareArr);
  // console.log(percentArr.length);
  let maxPercent = percentArr.reduce((a, b) => Math.max(a, b).toFixed(2));
  // console.log(maxPercent);
  for (let pairs of compareArr) {
    if (pairs.percentInCommon === maxPercent) {
      console.log(`The two specimens with the most in common are specimen ${pairs.specimen1.specimenNum} and specimen ${pairs.specimen2.specimenNum}, with ${maxPercent}% bases in common.`);
    }
  }
};

// let testObj = pAequorFactory(1, mockUpStrand());
// console.log(testObj);
// console.log(testObj.mutate());
// console.log(testObj.compareDNA(pAequorFactory(2, mockUpStrand())));
// console.log(testObj.willLikelySurvive());
// const thirtyStrands = createSurvivableStrands(30);
// console.log(thirtyStrands);
// for (let strand of thirtyStrands) {
//   console.log(strand.willLikelySurvive());
// }
// console.log(testObj.complementStrand());
const tenStrands = createSurvivableStrands(10);
findMostRelatedStrands(tenStrands);