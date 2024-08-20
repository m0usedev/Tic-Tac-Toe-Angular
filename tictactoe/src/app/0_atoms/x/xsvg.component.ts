import { Component, input } from '@angular/core';

@Component({
  selector: 'svg-x',
  standalone: true,
  imports: [],
  template: `
  <svg [style.width.px]="width()" [style.height.px]="height()" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.56658 1.46421L30 22.8982L51.4334 1.46421C53.221 -0.323366 56.0535 -0.489849 58.1696 1.16331L58.5358 1.4968C60.4881 3.44908 60.4881 6.61436 58.5358 8.56666L37.1019 30L58.5358 51.4334C60.3234 53.2209 60.4898 56.0536 58.8367 58.1696L58.5033 58.5358C56.551 60.4881 53.3856 60.4881 51.4333 58.5358L30 37.1018L8.56658 58.5358C6.779 60.3234 3.94647 60.4899 1.83043 58.8367L1.46422 58.5032C-0.488062 56.5509 -0.488085 53.3856 1.46422 51.4333L22.8981 30L1.46422 8.56664C-0.32336 6.77907 -0.489841 3.94644 1.16332 1.83041L1.49672 1.46421C3.44901 -0.488071 6.6143 -0.488071 8.56658 1.46421ZM5.07171 57.4997C5.05838 57.4999 5.04505 57.5 5.03173 57.5L5.07171 57.4997ZM5.40358 57.4724L5.29403 57.4863C5.33034 57.4825 5.36703 57.4778 5.40358 57.4724ZM4.66323 57.4728L4.70778 57.479C4.69267 57.4771 4.67831 57.4751 4.66323 57.4728ZM4.34905 57.4054L4.38811 57.4161C4.37463 57.4126 4.36248 57.4093 4.34905 57.4054ZM5.72097 57.4035L5.58623 57.438C5.63126 57.4278 5.67626 57.4163 5.72097 57.4035ZM6.00386 57.3039L5.89995 57.345C5.93458 57.3322 5.96929 57.3184 6.00386 57.3039ZM4.05913 57.3037C4.06509 57.3062 4.07144 57.3089 4.05913 57.3037V57.3037ZM3.76586 57.1564L3.50005 56.9759C3.61106 57.0622 3.72757 57.1379 3.84841 57.2029L3.76586 57.1564ZM6.29638 57.1571L6.21596 57.2024C6.24236 57.1882 6.26944 57.1729 6.29638 57.1571ZM57.2029 56.1515L57.1564 56.2341L56.9759 56.5C57.0622 56.389 57.1379 56.2724 57.2029 56.1515ZM57.3413 55.8466L57.3038 55.9409C57.3171 55.9094 57.3295 55.8781 57.3413 55.8466ZM57.437 55.5276L57.4054 55.6509C57.4167 55.6109 57.4274 55.5694 57.437 55.5276ZM57.4861 55.2322L57.4728 55.3368C57.4779 55.3025 57.4824 55.2674 57.4861 55.2322ZM54.9683 4.99913L30 29.9681L5.03173 4.99913L4.99907 5.03172L29.9681 30L4.99907 54.9683L5.03173 55.0009L30 30.0319L54.9683 55.0009L55.0009 54.9683L30.0319 30L55.0009 5.03172L54.9683 4.99913ZM57.4997 54.9283L57.4999 55.0008C57.5002 54.9768 57.5001 54.9525 57.4997 54.9283ZM57.4724 54.5965L57.4863 54.706C57.4825 54.6697 57.4779 54.633 57.4724 54.5965ZM57.4036 54.279L57.4381 54.4137C57.4279 54.3687 57.4164 54.3237 57.4036 54.279ZM57.3039 53.9961L57.345 54.1001C57.3322 54.0655 57.3185 54.0306 57.3039 53.9961ZM57.1571 53.7036L57.2023 53.7841C57.1881 53.7577 57.173 53.7305 57.1571 53.7036ZM2.79769 6.21594L2.83538 6.28355C2.82222 6.26085 2.81006 6.23896 2.79769 6.21594ZM2.65502 5.89989L2.68859 5.98602C2.67675 5.95734 2.66574 5.92891 2.65502 5.89989ZM2.56194 5.58629L2.58391 5.67527C2.57605 5.64565 2.56869 5.61612 2.56194 5.58629ZM2.51265 5.28404L2.52089 5.3557C2.51777 5.33172 2.51508 5.30809 2.51265 5.28404ZM2.50106 4.95918L2.49999 5.03172C2.49999 5.00739 2.50035 4.9835 2.50106 4.95918ZM2.52715 4.66318L2.52089 4.70774C2.52286 4.69263 2.52491 4.67827 2.52715 4.66318ZM2.59459 4.34912L2.58391 4.38818C2.58749 4.3747 2.59078 4.36255 2.59459 4.34912ZM2.69622 4.05913C2.69105 4.07144 2.6937 4.06509 2.69622 4.05913V4.05913ZM2.84362 3.7659L3.02413 3.5C2.93781 3.61102 2.86207 3.72764 2.79708 3.84848L2.84362 3.7659ZM6.21489 2.79711L6.2976 2.84358L6.56341 3.02408C6.45239 2.93776 6.33574 2.8621 6.21489 2.79711ZM53.784 2.79764L53.7164 2.83541C53.7391 2.82225 53.761 2.81002 53.784 2.79764ZM3.84749 2.79764L3.7799 2.83541C3.8026 2.82225 3.82447 2.81002 3.84749 2.79764ZM56.1516 2.79711L56.2341 2.84358L56.4999 3.02408C56.3889 2.93776 56.2724 2.8621 56.1516 2.79711ZM4.15358 2.65872L4.07744 2.68866C4.10264 2.67827 4.12812 2.66826 4.15358 2.65872ZM5.89949 2.65484L6.00432 2.69629C5.96937 2.68155 5.93456 2.66779 5.89949 2.65484ZM54.1 2.655L54.014 2.68866C54.0427 2.67683 54.071 2.66572 54.1 2.655ZM55.8466 2.65877L55.9409 2.69629C55.9094 2.68302 55.8781 2.67057 55.8466 2.65877ZM4.4731 2.56288L4.38811 2.58385C4.41608 2.57643 4.44494 2.56932 4.4731 2.56288ZM5.58608 2.56193L5.72142 2.59656C5.67637 2.58368 5.63131 2.57217 5.58608 2.56193ZM54.4138 2.56197L54.3248 2.58385C54.3544 2.57599 54.3839 2.56872 54.4138 2.56197ZM55.5277 2.56305L55.6509 2.59455C55.611 2.58322 55.5694 2.5726 55.5277 2.56305ZM4.77843 2.51278L4.70778 2.52096C4.73112 2.51793 4.75504 2.51515 4.77843 2.51278ZM5.28365 2.51265L5.40328 2.52763C5.36359 2.52169 5.32369 2.51669 5.28365 2.51265ZM54.716 2.51269L54.6443 2.52096C54.6683 2.51784 54.692 2.51511 54.716 2.51269ZM55.2222 2.51284L55.3368 2.52716C55.2991 2.52157 55.2607 2.51676 55.2222 2.51284ZM54.8958 2.50104L55.0412 2.50106C54.9927 2.49965 54.9443 2.49964 54.8958 2.50104ZM4.95879 2.50106L5.10421 2.50104C5.05574 2.49964 5.00725 2.49965 4.95879 2.50106Z" fill="#D9564C"/>
  </svg>`
})
export class XSvgComponent {
  width = input(80)
  height = input(80)
}
