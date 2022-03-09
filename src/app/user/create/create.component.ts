import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
     
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    
  userForm!: FormGroup;
    public transactions:any;
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public userService: UserService,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.getAllTransactions();
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      occupation: new FormControl('', Validators.required),
      transaction: new FormControl('', Validators.required)
    });
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.userForm.controls;
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.userForm.value);
    this.userService.create(this.userForm.value).subscribe((res:any) => {
         alert('User created successfully!');
         this.router.navigateByUrl('user/index');
    })
  }

  getAllTransactions(){
    this.userService.findTransactions().subscribe((res:any)=>{
      this.transactions = res;
      console.log(res)
    })
  }
  
}