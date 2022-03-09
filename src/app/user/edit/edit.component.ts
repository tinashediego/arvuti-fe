import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Transaction } from '../transaction';
     
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
      
  id!: number;
  user!: User;
  form!: FormGroup;
  transactions: Transaction[] = [];
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.getAllTransactions()
    this.id = this.route.snapshot.params['postId'];
    this.userService.find(this.id).subscribe((data: User)=>{
      this.user = data;
    }); 
      
    this.form = new FormGroup({
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
    return this.form.controls;
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.userService.update(this.id, this.form.value).subscribe((res:any) => {
         alert('User updated successfully!');
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
